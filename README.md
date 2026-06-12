# CV Screening App - SAP CAP + Fiori + AI

AI-powered CV screening application built with SAP CAP, SAP Fiori Elements, and Groq AI.

## Live Demo
- **Upload Page:** https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/upload.html
- **OData API:** https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/candidate/Candidates

## Features
- Upload CV files (PDF, DOCX, TXT)
- AI-powered data extraction using Groq LLM (llama-3.3-70b-versatile)
- Auto-generates professional AI summary with key strengths and role fit
- SAP Fiori Elements UI with List Report and Object Page
- Deployed on SAP BTP Cloud Foundry

## Tech Stack
- SAP CAP (Cloud Application Programming Model)
- SAP Fiori Elements (SAPUI5)
- Node.js
- Groq AI (llama-3.3-70b-versatile)
- SQLite
- SAP BTP Cloud Foundry

## Installation
```bash
git clone https://github.com/akshayy718/cv-screening-app.git
cd cv-screening-app
npm install
```

## Configuration
Create a `.env` file:
