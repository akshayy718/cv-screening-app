const cds = require('@sap/cds');
const Groq = require('groq-sdk');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

module.exports = class CandidateService extends cds.ApplicationService {

    async init() {

        this.on('uploadCV', async (req) => {
            const { candidateId, fileName, fileContent } = req.data;

            if (!fileName || !fileContent) {
                req.error(400, 'fileName and fileContent are required');
                return;
            }

            const ext = path.extname(fileName).toLowerCase();
            if (!['.pdf', '.docx', '.txt'].includes(ext)) {
                req.error(400, 'Only PDF, DOCX and TXT files are allowed');
                return;
            }

            try {
                let actualId = candidateId;
                if (!actualId) {
                    actualId = cds.utils.uuid();
                    await INSERT.into('cv.screening.Candidates').entries({
                        ID: actualId,
                        FullName: 'Processing...',
                        CreatedAt: new Date().toISOString()
                    });
                }

                const fileBuffer = Buffer.from(fileContent, 'base64');
                const safeFileName = actualId + '_' + fileName;
                const filePath = path.join(uploadDir, safeFileName);
                fs.writeFileSync(filePath, fileBuffer);

                let extractedText = '';
                if (ext === '.pdf') {
                    const pdfData = await pdfParse(fileBuffer);
                    extractedText = pdfData.text;
                } else if (ext === '.docx') {
                    const result = await mammoth.extractRawText({ buffer: fileBuffer });
                    extractedText = result.value;
                } else if (ext === '.txt') {
                    extractedText = fileBuffer.toString('utf8');
                }

                if (!extractedText || extractedText.trim() === '') {
                    req.error(400, 'Could not extract text from file');
                    return;
                }

                await UPDATE('cv.screening.Candidates')
                    .set({ CVFileName: fileName, CVText: extractedText })
                    .where({ ID: actualId });

                await this._processCV(actualId, extractedText);

                return JSON.stringify({ success: true, candidateId: actualId });

            } catch (err) {
                console.error('Upload error:', err);
                req.error(500, 'Upload failed: ' + err.message);
            }
        });

        this.on('processCV', async (req) => {
            const { candidateId } = req.data;
            const candidate = await SELECT.one
                .from('cv.screening.Candidates')
                .where({ ID: candidateId });

            if (!candidate || !candidate.CVText) {
                req.error(400, 'No CV text found');
                return;
            }

            await this._processCV(candidateId, candidate.CVText);
            return 'CV processed successfully';
        });

        await super.init();
    }

    async _processCV(candidateId, cvText) {

        const extractionResponse = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a CV parser. Extract information and return ONLY a valid JSON object with these fields: FullName, Email, Phone, Skills (comma separated), YearsOfExperience (number), CurrentRole. Return ONLY the JSON. No extra text. No markdown.'
                },
                {
                    role: 'user',
                    content: cvText
                }
            ]
        });

        let extractedData = {};
        try {
            const rawText = extractionResponse.choices[0].message.content;
            const cleaned = rawText.replace(/```json|```/g, '').trim();
            extractedData = JSON.parse(cleaned);
        } catch (e) {
            console.error('Parse error:', e);
        }

        const summaryResponse = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional HR assistant. Based on the CV provided, generate: 1. A professional summary (5-8 lines) 2. Key strengths (3-5 bullet points) 3. Suggested role fit. Format it clearly with headings.'
                },
                {
                    role: 'user',
                    content: cvText
                }
            ]
        });

        const aiSummary = summaryResponse.choices[0].message.content;

        await UPDATE('cv.screening.Candidates')
            .set({
                FullName: extractedData.FullName || '',
                Email: extractedData.Email || '',
                Phone: extractedData.Phone || '',
                Skills: extractedData.Skills || '',
                YearsOfExperience: extractedData.YearsOfExperience || 0,
                CurrentRole: extractedData.CurrentRole || '',
                AISummary: aiSummary
            })
            .where({ ID: candidateId });
    }
};