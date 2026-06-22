from sqlalchemy.orm import Session

from services.db import SessionLocal
from models.threat import Threat


def save_threat(
    content: str,
    analysis: dict
):

    if not analysis.get(
        "is_valid_threat",
        True
    ):
        return None

    db: Session = SessionLocal()

    try:

        existing = db.query(
            Threat
        ).filter(
            Threat.fingerprint ==
            analysis.get(
                "fingerprint"
            )
        ).first()

        if existing:
            return existing

        threat = Threat(

            content=content,

            threat_category=analysis.get(
                "threat_category",
                "Unknown"
            ),

            attack_family=analysis.get(
                "attack_family",
                "Unknown"
            ),

            delivery_vector=analysis.get(
                "delivery_vector",
                "Unknown"
            ),

            target_profile=analysis.get(
                "target_profile",
                "Unknown"
            ),

            objective=analysis.get(
                "objective",
                "Unknown"
            ),

            risk_level=analysis.get(
                "risk_level",
                "Low"
            ),

            confidence=analysis.get(
                "confidence",
                0
            ),

            intelligence_score=analysis.get(
                "intelligence_score",
                0
            ),

            fingerprint=analysis.get(
                "fingerprint",
                "UNKNOWN"
            ),

            summary=analysis.get(
                "summary",
                ""
            ),

            confidence_reason=analysis.get(
                "confidence_reason",
                ""
            ),

            recommended_actions=str(
                analysis.get(
                    "recommended_actions",
                    []
                )
            ),

            domains=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "domains",
                    []
                )
            ),

            urls=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "urls",
                    []
                )
            ),

            emails=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "emails",
                    []
                )
            ),

            ips=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "ips",
                    []
                )
            ),

            wallets=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "wallets",
                    []
                )
            ),

            phone_numbers=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "phone_numbers",
                    []
                )
            ),

            file_hashes=str(
                analysis.get(
                    "iocs",
                    {}
                ).get(
                    "file_hashes",
                    []
                )
            ),

            email_verdict=analysis.get(
                "email_verdict",
                "Unknown"
            ),

            email_authenticity_score=analysis.get(
                "email_authenticity_score",
                0
            ),

            detected_brand=analysis.get(
                "brand_analysis",
                {}
            ).get(
                "brand_detected",
                ""
            ),

            brand_risk_score=analysis.get(
                "brand_analysis",
                {}
            ).get(
                "risk_score",
                0
            )
        )

        db.add(threat)

        db.commit()

        db.refresh(threat)

        return threat

    except Exception as e:

        print(
            "THREAT SAVE ERROR:",
            str(e)
        )

        db.rollback()

        return None

    finally:

        db.close()


def get_all_threats():

    db: Session = SessionLocal()

    try:

        return db.query(
            Threat
        ).all()

    finally:

        db.close()


def find_similar_threats(
    attack_family: str,
    delivery_vector: str,
    target_profile: str
):

    db: Session = SessionLocal()

    try:
        
        matches = db.query(
            Threat
        ).filter(

            Threat.attack_family ==
            attack_family

        ).all()

        return matches

    finally:

        db.close()