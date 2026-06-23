from fastapi import APIRouter
from sqlalchemy import or_

from services.db import SessionLocal
from models.threat import Threat

router = APIRouter()


@router.get("/search")
async def search(query: str):

    db = SessionLocal()

    try:

        results = db.query(
            Threat
        ).filter(
            or_(
                Threat.fingerprint.ilike(f"%{query}%"),
                Threat.threat_category.ilike(f"%{query}%"),
                Threat.attack_family.ilike(f"%{query}%"),
                Threat.delivery_vector.ilike(f"%{query}%"),
                Threat.target_profile.ilike(f"%{query}%"),
                Threat.risk_level.ilike(f"%{query}%")
            )
        ).all()

        return [
            {
                "id": threat.id,

                "fingerprint":
                threat.fingerprint,

                "threat_category":
                threat.threat_category,

                "attack_family":
                threat.attack_family,

                "delivery_vector":
                threat.delivery_vector,

                "target_profile":
                threat.target_profile,

                "risk_level":
                threat.risk_level,

                "intelligence_score":
                threat.intelligence_score,

                "summary":
                threat.summary,

                "created_at":
                threat.created_at
            }
            for threat in results
        ]

    finally:

        db.close()