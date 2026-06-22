from pydantic import BaseModel
from typing import List


class IOCData(BaseModel):
    domains: List[str] = []
    emails: List[str] = []
    ips: List[str] = []
    wallets: List[str] = []


class ThreatAnalysisRequest(BaseModel):
    content: str


class ThreatAnalysisResponse(BaseModel):
    attack_family: str
    delivery_vector: str
    target_profile: str
    objective: str
    risk_level: str
    confidence: int
    fingerprint: str
    summary: str
    confidence_reason: str
    iocs: IOCData