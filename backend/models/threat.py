from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy.sql import func

from services.db import Base


class Threat(Base):

    __tablename__ = "threats"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==================================
    # RAW CONTENT
    # ==================================

    content = Column(
        Text
    )

    # ==================================
    # CLASSIFICATION
    # ==================================

    threat_category = Column(
        String
    )

    attack_family = Column(
        String
    )

    delivery_vector = Column(
        String
    )

    target_profile = Column(
        String
    )

    objective = Column(
        String
    )

    risk_level = Column(
        String
    )

    confidence = Column(
        Integer
    )

    intelligence_score = Column(
        Integer,
        default=0
    )

    # ==================================
    # IOC STORAGE
    # ==================================

    domains = Column(
        Text,
        default=""
    )

    urls = Column(
        Text,
        default=""
    )

    emails = Column(
        Text,
        default=""
    )

    ips = Column(
        Text,
        default=""
    )

    wallets = Column(
        Text,
        default=""
    )

    phone_numbers = Column(
        Text,
        default=""
    )

    file_hashes = Column(
        Text,
        default=""
    )

    # ==================================
    # ANALYSIS
    # ==================================

    fingerprint = Column(
        String,
        unique=True
    )

    summary = Column(
        Text
    )

    confidence_reason = Column(
        Text
    )

    similarity_score = Column(
        Float,
        default=0
    )

    recommended_actions = Column(
        Text
    )

    # ==================================
    # EMAIL INTELLIGENCE
    # ==================================

    email_verdict = Column(
        String,
        default="Unknown"
    )

    email_authenticity_score = Column(
        Integer,
        default=0
    )

    # ==================================
    # BRAND INTELLIGENCE
    # ==================================

    detected_brand = Column(
        String,
        default=""
    )

    brand_risk_score = Column(
        Integer,
        default=0
    )

    # ==================================
    # TIMESTAMPS
    # ==================================

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )