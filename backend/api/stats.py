from fastapi import APIRouter

from sqlalchemy import func

from services.db import SessionLocal
from models.threat import Threat

router = APIRouter()


@router.get("/stats")
async def stats():

    db = SessionLocal()

    try:

        total_threats = db.query(
            func.count(Threat.id)
        ).scalar() or 0

        high_risk_threats = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.risk_level == "High"
        ).scalar() or 0

        critical_threats = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.risk_level == "Critical"
        ).scalar() or 0

        medium_risk_threats = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.risk_level == "Medium"
        ).scalar() or 0

        low_risk_threats = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.risk_level == "Low"
        ).scalar() or 0

        phishing_count = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.threat_category == "Phishing"
        ).scalar() or 0

        malware_count = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.threat_category == "Malware"
        ).scalar() or 0

        credential_theft_count = db.query(
            func.count(Threat.id)
        ).filter(
            Threat.attack_family == "Credential Theft"
        ).scalar() or 0

        average_intelligence_score = db.query(
            func.avg(
                Threat.intelligence_score
            )
        ).scalar()

        if average_intelligence_score is None:
            average_intelligence_score = 0

        average_intelligence_score = round(
            float(
                average_intelligence_score
            ),
            2
        )

        top_attack_family_query = db.query(
            Threat.attack_family,
            func.count(
                Threat.attack_family
            ).label("count")
        ).group_by(
            Threat.attack_family
        ).order_by(
            func.count(
                Threat.attack_family
            ).desc()
        ).first()

        top_attack_family = "None"

        if top_attack_family_query:
            top_attack_family = (
                top_attack_family_query[0]
            )

        return {

            "total_threats":
            total_threats,

            "high_risk_threats":
            high_risk_threats,

            "critical_threats":
            critical_threats,

            "medium_risk_threats":
            medium_risk_threats,

            "low_risk_threats":
            low_risk_threats,

            "phishing_count":
            phishing_count,

            "malware_count":
            malware_count,

            "credential_theft_count":
            credential_theft_count,

            "top_attack_family":
            top_attack_family,

            "average_intelligence_score":
            average_intelligence_score,

            "risk_distribution": {
                "critical": critical_threats,
                "high": high_risk_threats,
                "medium": medium_risk_threats,
                "low": low_risk_threats
            }
        }

    finally:

        db.close()