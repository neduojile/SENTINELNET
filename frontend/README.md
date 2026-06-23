# SentinelNet

## Threat Genome Intelligence Platform

SentinelNet is an AI-powered cyber threat intelligence platform designed to detect, analyze, classify, and correlate malicious activity from emails, URLs, indicators of compromise (IOCs), threat reports, and security events.

The platform leverages Large Language Models, threat correlation logic, IOC extraction, memory matching, and intelligence enrichment to transform raw security data into actionable intelligence.

---

## Key Features

### Threat Analysis Engine

* AI-powered threat classification
* Phishing detection
* Malware detection
* Crypto scam detection
* Brand impersonation detection
* Credential theft identification

### IOC Extraction

Automatically extracts:

* Domains
* URLs
* IP Addresses
* Email Addresses
* Cryptocurrency Wallets
* File Hashes
* Phone Numbers

### Threat Genome Fingerprinting

Generates a unique threat fingerprint for every analyzed threat to support:

* Campaign tracking
* Threat clustering
* Memory correlation
* Repeat attack detection

### Threat Intelligence Dashboard

Provides:

* Risk scoring
* Confidence scoring
* Threat categorization
* Attack family identification
* Executive intelligence summaries
* Recommended response actions

### Threat Memory Database

Stores historical intelligence and enables:

* Memory matching
* Similar attack discovery
* Campaign correlation
* Historical threat tracking

### MITRE ATT&CK Mapping

Maps observed behaviors to recognized attack techniques and tactics.

---

## Architecture

Frontend:

* Next.js 16
* React
* Tailwind CSS
* Axios

Backend:

* FastAPI
* SQLAlchemy
* SQLite / PostgreSQL
* Python

Artificial Intelligence:

* Groq LLM API
* Threat Genome Engine
* IOC Correlation Engine
* Threat Memory Engine

---

## Platform Workflow

1. User submits threat content.
2. SentinelNet extracts indicators.
3. AI engine classifies the threat.
4. Threat Genome Fingerprint is generated.
5. Intelligence database is queried.
6. Historical correlations are identified.
7. MITRE ATT&CK mapping is performed.
8. Executive intelligence report is generated.
9. Recommended actions are provided.

---

## Supported Inputs

* Phishing Emails
* Threat Reports
* URLs
* IOC Dumps
* Security Alerts
* Malware Indicators
* Crypto Scam Reports
* Brand Impersonation Attempts

---

## Screenshots

### Landing Page

Modern cyber intelligence dashboard with live operational telemetry.

### Command Center

Threat Genome Command Center used for threat investigations.

### Threat Analysis

Executive threat intelligence reporting workspace.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/neduojile/SENTINELNET.git
cd SENTINELNET
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python create_tables.py

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create:

```env
backend/.env
```

Example:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## API Endpoints

### Health Check

```http
GET /
```

### Threat Analysis

```http
POST /analyze
```

### Statistics

```http
GET /stats
```

---

## Example Threat Categories

* Phishing
* Malware
* Credential Theft
* Crypto Scam
* Brand Impersonation
* Social Engineering
* Suspicious Infrastructure

---

## Security Notice

SentinelNet is intended for cybersecurity research, threat intelligence analysis, security operations, and educational purposes.

Users are responsible for ensuring compliance with local laws, organizational policies, and security guidelines.

---

## Future Roadmap

* Real-time IOC feeds
* Threat actor profiling
* YARA rule generation
* SIEM integrations
* VirusTotal enrichment
* AbuseIPDB enrichment
* MITRE ATT&CK visual mapping
* Threat campaign clustering
* Multi-tenant intelligence workspaces

---

## Author

**Chinexojile Nedu**

Cybersecurity Researcher
Threat Intelligence Enthusiast
AI Security Developer

---

## SentinelNet

**Detect. Correlate. Respond.**
