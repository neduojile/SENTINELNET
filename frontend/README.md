# SentinelNet

> AI-Powered Threat Intelligence & Decentralized Evidence Preservation Platform

![SentinelNet Banner](./public/assets/sentinelnet-logo.png)

## Overview

SentinelNet is an autonomous cyber threat intelligence platform that transforms suspicious content into actionable intelligence reports and permanently preserves investigation evidence on the 0G decentralized storage network.

The platform combines AI-powered threat analysis, threat fingerprinting, forensic report generation, and decentralized evidence storage into a single investigation workflow.

Security analysts, researchers, organizations, and incident response teams can use SentinelNet to analyze threats, generate intelligence reports, and preserve evidence with verifiable integrity.

---

## Problem

Cybersecurity investigations often suffer from:

- Fragmented analysis workflows
- Loss of evidence integrity
- Centralized storage risks
- Difficulty proving evidence authenticity
- Lack of immutable investigation records

Traditional threat reports can be modified, deleted, or disputed.

Organizations need a way to analyze threats while preserving investigation artifacts in a tamper-resistant environment.

---

## Solution

SentinelNet introduces an end-to-end investigation pipeline:

### Threat Analysis

Users submit:

- Phishing emails
- Suspicious URLs
- Malware reports
- IOC dumps
- Threat intelligence reports

The AI engine analyzes submitted content and generates:

- Threat category
- Risk level
- Confidence score
- Executive summary
- Threat fingerprint
- Recommendations

---

### Intelligence Report Generation

SentinelNet automatically creates a professional PDF intelligence report containing:

- Executive Summary
- Threat Attribution
- Risk Assessment
- Recommendations
- Investigation Metadata
- Threat Fingerprint

Reports can be downloaded immediately for operational use.

---

### Evidence Preservation

Generated reports are uploaded to:

# 0G Storage Network

Each report receives:

- Merkle Root Hash
- Blockchain Transaction Record
- Verifiable Storage Proof

This creates a permanent forensic record that can be independently verified.

---

## Key Features

### AI Threat Intelligence Engine

- Automated threat classification
- Threat scoring
- Confidence estimation
- Threat fingerprint generation

### Investigation Workspace

- Threat visualization
- Memory correlation
- Intelligence summaries
- Investigation tracking

### PDF Intelligence Reports

- Professional threat reports
- Downloadable evidence packages
- Executive-ready documentation

### 0G Decentralized Storage

- Evidence preservation
- Verifiable integrity
- Tamper-resistant storage
- Blockchain-backed records

### Evidence Vault

- Root Hash display
- Verification metadata
- Investigation lifecycle tracking

---

## How It Works

```text
Threat Submission
        │
        ▼
AI Threat Analysis
        │
        ▼
Threat Intelligence Report
        │
        ▼
Evidence Packaging
        │
        ▼
0G Storage Upload
        │
        ▼
Root Hash Generation
        │
        ▼
Evidence Verification
```

---

## Architecture

```text
┌────────────────────┐
│     Frontend       │
│      Next.js       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│      FastAPI       │
│      Backend       │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Threat Engine    │
│       Groq AI      │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Report Generator   │
│      jsPDF         │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   0G Storage       │
│ Decentralized Net  │
└────────────────────┘
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- TailwindCSS
- React Flow
- Axios
- jsPDF

### Backend

- FastAPI
- Python
- Uvicorn

### AI

- Groq API
- LLM Threat Analysis

### Storage

- 0G Storage Network
- 0G Storage Client

### Infrastructure

- Vercel
- Render

---

## 0G Integration

SentinelNet integrates directly with the 0G Storage Network.

### Workflow

1. Generate Threat Report
2. Convert report into PDF
3. Upload report to 0G
4. Receive Merkle Root Hash
5. Display evidence verification record
6. Preserve report permanently

Example Output:

```json
{
  "success": true,
  "rootHash": "0x5e111f1b236b2fb6257209540ad7fd1bf9a3fb6f9eb3413ab57019be38edba26"
}
```

---

## Screenshots

### Threat Analysis Dashboard

Add screenshot here

### Investigation Workspace

Add screenshot here

### Evidence Vault

Add screenshot here

### 0G Verification

Add screenshot here

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/sentinelnet.git

cd sentinelnet
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Backend:

```text
http://localhost:8000
```

---

## Environment Variables

### Frontend

Create:

```env
.env.local
```

```env
NEXT_PUBLIC_API_URL=https://your-render-api-url.onrender.com
```

---

### Backend

Create:

```env
.env
```

```env
GROQ_API_KEY=your_groq_api_key
```

---

## Deployment

### Frontend

Deploy on:

- Vercel

### Backend

Deploy on:

- Render

---

## Future Improvements

- Multi-file evidence preservation
- Threat sharing network
- Analyst collaboration
- Case management system
- Threat history timeline
- Wallet-based authentication
- Real-time threat feeds
- On-chain evidence registry

---

## Impact

SentinelNet bridges the gap between AI-powered cybersecurity investigations and decentralized evidence preservation.

By combining threat intelligence automation with immutable storage, organizations gain:

- Stronger evidence integrity
- Better incident documentation
- Improved investigation transparency
- Verifiable forensic records

---

## Author

### Emmanuel Ojile

Cybersecurity Builder | AI Developer | Web3 Enthusiast

---

## License

MIT License

---

## Built For

### 0G Zero Cup

AI x Security x Decentralized Storage