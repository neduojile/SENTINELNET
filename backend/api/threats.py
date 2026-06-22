from fastapi import APIRouter
from fastapi import HTTPException

from services.threat_memory import get_all_threats
from services.db import SessionLocal
from models.threat import Threat

router = APIRouter()


@router.get("/threats")
async def threats():

    records = get_all_threats()

    return [
        {
            "id": threat.id,

            "fingerprint": threat.fingerprint,

            "threat_category": threat.threat_category,

            "attack_family": threat.attack_family,

            "delivery_vector": threat.delivery_vector,

            "target_profile": threat.target_profile,

            "objective": threat.objective,

            "risk_level": threat.risk_level,

            "confidence": threat.confidence,

            "intelligence_score": threat.intelligence_score,

            "summary": threat.summary,

            "email_verdict": threat.email_verdict,

            "email_authenticity_score":
            threat.email_authenticity_score,

            "detected_brand":
            threat.detected_brand,

            "brand_risk_score":
            threat.brand_risk_score,

            "created_at":
            threat.created_at
        }
        for threat in records
    ]


@router.get("/threats/{fingerprint}")
async def threat_details(
    fingerprint: str
):

    db = SessionLocal()

    try:

        threat = db.query(
            Threat
        ).filter(
            Threat.fingerprint == fingerprint
        ).first()

        if not threat:

            raise HTTPException(
                status_code=404,
                detail="Threat not found"
            )

        return {

            "id": threat.id,

            "fingerprint": threat.fingerprint,

            "threat_category": threat.threat_category,

            "attack_family": threat.attack_family,

            "delivery_vector": threat.delivery_vector,

            "target_profile": threat.target_profile,

            "objective": threat.objective,

            "risk_level": threat.risk_level,

            "confidence": threat.confidence,

            "intelligence_score": threat.intelligence_score,

            "summary": threat.summary,

            "confidence_reason":
            threat.confidence_reason,

            "domains":
            threat.domains,

            "urls":
            threat.urls,

            "emails":
            threat.emails,

            "ips":
            threat.ips,

            "wallets":
            threat.wallets,

            "phone_numbers":
            threat.phone_numbers,

            "file_hashes":
            threat.file_hashes,

            "email_verdict":
            threat.email_verdict,

            "email_authenticity_score":
            threat.email_authenticity_score,

            "detected_brand":
            threat.detected_brand,

            "brand_risk_score":
            threat.brand_risk_score,

            "created_at":
            threat.created_at
        }

    finally:

        db.close()