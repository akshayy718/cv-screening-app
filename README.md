<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0,0070F2,009FDA,00B4D8&height=200&section=header&text=CV%20Screening%20App&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=36&desc=AI-Powered%20Candidate%20Screening%20%7C%20SAP%20BTP%20%7C%20Cloud%20Foundry&descAlignY=58&descSize=16" width="100%"/>
</div>

<div align="center">

[![Live App](https://img.shields.io/badge/🚀_Live_App-SAP_BTP_Cloud_Foundry-0070F2?style=for-the-badge&logo=sap&logoColor=white)](https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/upload.html)
[![OData API](https://img.shields.io/badge/📊_OData_API-Live_Candidates_Data-009FDA?style=for-the-badge&logo=sap&logoColor=white)](https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/candidate/Candidates)
[![GitHub](https://img.shields.io/badge/GitHub-akshayy718-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akshayy718)

</div>

<div align="center">

![SAP CAP](https://img.shields.io/badge/SAP%20CAP-v9-0070F2?style=flat-square&logo=sap&logoColor=white)
![SAP Fiori](https://img.shields.io/badge/SAP%20Fiori%20Elements-009FDA?style=flat-square&logo=sap&logoColor=white)
![SAP BTP](https://img.shields.io/badge/SAP%20BTP-Cloud%20Foundry-00B4D8?style=flat-square&logo=sap&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Groq AI](https://img.shields.io/badge/Groq-llama--3.3--70b-F55036?style=flat-square)
![OData](https://img.shields.io/badge/OData-v4-0070F2?style=flat-square)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)

</div>

---

## 📌 Overview

An **enterprise-grade AI-powered CV screening application** built natively on **SAP BTP** using **SAP CAP (Cloud Application Programming Model)**. Upload a candidate's CV in PDF, DOCX, or TXT format — the app automatically extracts structured data and generates a professional AI summary using **Groq's Llama 3.3 70B** model, displayed in a full **SAP Fiori Elements UI**.

> 🏆 Built as a take-home assignment for Apsolut Middle East & Africa — first SAP BTP project, built from scratch in 2 days.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **Multi-format Upload** | PDF, DOCX, TXT with automatic text extraction |
| 🤖 **AI Data Extraction** | Name, Email, Phone, Skills, Experience, Current Role |
| 📝 **AI Summary** | Professional summary with Key Strengths and Role Fit |
| 📋 **Fiori List Report** | Sortable and filterable candidate table |
| 🔍 **Fiori Object Page** | Full candidate details with AI summary sections |
| ☁️ **Live on SAP BTP** | Deployed on Cloud Foundry us10 region |
| 🔒 **Secure Secrets** | API keys via CF environment variables |

---

## 🔗 Live Demo

<div align="center">

| Link | Description |
|------|-------------|
| [📤 Upload Page](https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/upload.html) | Upload a CV and see AI extraction live |
| [📊 OData API](https://cv-screening-app.cfapps.us10-001.hana.ondemand.com/candidate/Candidates) | Live candidate data as OData JSON |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  SAP BTP Cloud Foundry                   │
│                                                          │
│  ┌─────────────────┐      ┌──────────────────────────┐  │
│  │   SAP Fiori UI  │      │    Custom Upload Page     │  │
│  │  List Report    │      │    app/upload.html        │  │
│  │  Object Page    │      │    (HTML + JavaScript)    │  │
│  └────────┬────────┘      └────────────┬─────────────┘  │
│           │                            │                  │
│           ▼                            ▼                  │
│  ┌─────────────────────────────────────────────────────┐ │
│  │            SAP CAP Service Layer (Node.js)           │ │
│  │   srv/service.cds  →  OData v4 API (/candidate)     │ │
│  │   srv/service.js   →  Business Logic + AI Calls     │ │
│  └──────────────────────────┬──────────────────────────┘ │
│                             │                             │
│           ┌─────────────────┼──────────────┐             │
│           ▼                 ▼              ▼             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │  SQLite DB   │  │  Groq AI API │  │  File Store  │   │
│  │  db.sqlite   │  │  Llama 3.3   │  │  uploads/    │   │
│  │  (CAP CDS)   │  │  70B Model   │  │              │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 🤖 AI Pipeline

```
  User Uploads CV File
  (PDF / DOCX / TXT)
         │
         ▼
  ┌─────────────────┐
  │  Text Extraction │
  │  pdf-parse (PDF) │
  │  mammoth (DOCX)  │
  │  utf8 (TXT)      │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────────────────────┐
  │       Groq API — Call 1         │
  │   Model: llama-3.3-70b          │
  │   Prompt: Extract as JSON       │
  │                                 │
  │   Output:                       │
  │   {                             │
  │     FullName: "...",            │
  │     Email: "...",               │
  │     Phone: "...",               │
  │     Skills: "...",              │
  │     YearsOfExperience: N,       │
  │     CurrentRole: "..."          │
  │   }                             │
  └────────┬────────────────────────┘
           │
           ▼
  ┌─────────────────────────────────┐
  │       Groq API — Call 2         │
  │   Model: llama-3.3-70b          │
  │   Prompt: Generate Summary      │
  │                                 │
  │   Output:                       │
  │   - Professional Summary        │
  │   - Key Strengths               │
  │   - Suggested Role Fit          │
  └────────┬────────────────────────┘
           │
           ▼
  ┌─────────────────┐
  │  Save to SQLite  │
  │  via CAP CDS     │
  │  Query API       │
  └────────┬────────┘
           │
           ▼
  Display in SAP Fiori UI
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | SAP CAP v9 | Core app framework — OData, DB, handlers |
| **Frontend** | SAP Fiori Elements (SAPUI5) | List Report + Object Page UI |
| **Upload UI** | Custom HTML5 + JavaScript | CV file upload with progress steps |
| **Backend** | Node.js 20.x | Business logic and API handling |
| **AI Model** | Groq llama-3.3-70b-versatile | Data extraction + summary generation |
| **Database** | SQLite (@cap-js/sqlite) | Candidate data storage |
| **API** | OData v4 | Auto-generated by CAP from CDS |
| **PDF Parser** | pdf-parse 1.1.1 | Extract text from PDF files |
| **DOCX Parser** | mammoth | Extract text from Word documents |
| **Deployment** | SAP BTP Cloud Foundry | Live production hosting |
| **Buildpack** | nodejs_buildpack | Node.js runtime on CF |

</div>

---

## 📁 Project Structure

```
cv-screening-app/
├── 📁 app/
│   ├── 📁 candidates/       → Fiori Elements App (manifest.json)
│   ├── 📄 annotations.cds   → UI.LineItem, UI.Facets, UI.FieldGroup
│   └── 📄 upload.html       → Custom CV upload page
├── 📁 db/
│   └── 📄 schema.cds        → Candidates entity (11 fields)
├── 📁 srv/
│   ├── 📄 service.cds       → OData service + uploadCV action
│   └── 📄 service.js        → File upload + Groq AI logic
├── 📁 screenshots/          → App screenshots
├── 📄 .cdsrc.json           → CDS config (db, auth, body-parser)
├── 📄 manifest.yml          → SAP BTP Cloud Foundry deployment
├── 📄 package.json          → npm dependencies + CAP config
└── 📄 db.sqlite             → SQLite database file
```

---

## 🗄️ Data Model

```cds
namespace cv.screening;

entity Candidates {
  key ID                : UUID;
      FullName          : String(100);
      Email             : String(100);
      Phone             : String(20);
      Skills            : String(500);
      YearsOfExperience : Integer;
      CurrentRole       : String(100);
      CVFileName        : String(200);
      CVText            : LargeString;
      AISummary         : LargeString;
      CreatedAt         : Timestamp;
}
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- SAP CDS CLI → `npm install -g @sap/cds-dk`
- Free Groq API Key → [console.groq.com](https://console.groq.com)

### Setup

```bash
# Clone the repo
git clone https://github.com/akshayy718/cv-screening-app.git
cd cv-screening-app

# Install dependencies
npm install

# Create .env file
echo "GROQ_API_KEY=your_key_here" > .env

# Run locally
cds watch
```

Open → `http://localhost:4004/upload.html`

---

## ☁️ SAP BTP Deployment

```bash
# Login to Cloud Foundry
cf login -a https://api.cf.us10-001.hana.ondemand.com --sso

# Deploy
cf push

# Set Groq API Key
cf set-env cv-screening-app GROQ_API_KEY your_key_here

# Apply changes
cf restage cv-screening-app
```

---

## 📸 Screenshots

> All screenshots are available in the [/screenshots](./screenshots) folder.

---

## 🔮 Future Improvements

- [ ] **SAP HANA Cloud** — replace SQLite for enterprise-grade database
- [ ] **XSUAA Authentication** — role-based access with SAP BTP security
- [ ] **HTML5 Repository + App Router** — full Fiori UI on BTP
- [ ] **Job Description Matching** — score candidates against a JD
- [ ] **Batch CV Processing** — upload multiple CVs at once
- [ ] **SAP Generative AI Hub** — enterprise LLM via SAP AI Core

---

## 👨‍💻 Author

<div align="center">

**Akshay Santhosh** — AI/ML Engineer · SAP BTP Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Akshay%20Santhosh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akshay-santhosh-435499208/-)
[![GitHub](https://img.shields.io/badge/GitHub-akshayy718-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/akshayy718)
[![Email](https://img.shields.io/badge/Gmail-akshaysanthosh718-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:akshaysanthosh718@gmail.com)

</div>

---

<div align="center">

*Built with ❤️ using SAP CAP · Groq AI · SAP BTP Cloud Foundry*

<img src="https://capsule-render.vercel.app/api?type=waving&color=0,00B4D8,009FDA,0070F2&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
