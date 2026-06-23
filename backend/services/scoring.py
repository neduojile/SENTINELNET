def calculate_intelligence_score(data: dict):

    score = 0

    risk = data.get(
        "risk_level",
        "Low"
    )

    confidence = int(
        data.get(
            "confidence",
            0
        )
    )

    auth_score = int(
        data.get(
            "email_authenticity_score",
            50
        )
    )

    category = data.get(
        "threat_category",
        "Unknown"
    )

    iocs = data.get(
        "iocs",
        {}
    )

    brand_analysis = data.get(
        "brand_analysis",
        {}
    )

    authentication_analysis = data.get(
        "authentication_analysis",
        {}
    )

    # ==================================
    # RISK WEIGHT
    # ==================================

    risk_weights = {
        "Critical": 35,
        "High": 25,
        "Medium": 15,
        "Low": 5,
    }

    score += risk_weights.get(
        risk,
        5
    )

    # ==================================
    # AI CONFIDENCE
    # ==================================

    score += round(
        confidence * 0.20
    )

    # ==================================
    # IOC DENSITY
    # ==================================

    score += len(
        iocs.get("domains", [])
    ) * 2

    score += len(
        iocs.get("urls", [])
    ) * 3

    score += len(
        iocs.get("emails", [])
    ) * 3

    score += len(
        iocs.get("ips", [])
    ) * 4

    score += len(
        iocs.get("wallets", [])
    ) * 5

    score += len(
        iocs.get("phone_numbers", [])
    ) * 2

    score += len(
        iocs.get("file_hashes", [])
    ) * 8

    # ==================================
    # THREAT CATEGORY WEIGHT
    # ==================================

    category_weights = {

        "Ransomware": 25,
        "Malware": 20,
        "Trojan": 20,
        "Credential Theft": 18,
        "Business Email Compromise": 18,
        "Wallet Drainer": 18,
        "Crypto Scam": 15,
        "Phishing": 12,
        "Fraud": 10,
        "Social Engineering": 10,
        "Supply Chain Attack": 25,
        "Insider Threat": 20,
        "Unknown": 0,
    }

    score += category_weights.get(
        category,
        0
    )

    # ==================================
    # IOC BONUS
    # ==================================

    total_iocs = (
        len(iocs.get("domains", []))
        + len(iocs.get("urls", []))
        + len(iocs.get("emails", []))
        + len(iocs.get("ips", []))
        + len(iocs.get("wallets", []))
        + len(iocs.get("phone_numbers", []))
        + len(iocs.get("file_hashes", []))
    )

    if total_iocs >= 10:
        score += 10

    elif total_iocs >= 5:
        score += 5

    # ==================================
    # EMAIL AUTHENTICITY
    # ==================================

    if auth_score < 20:

        score += 20

    elif auth_score < 40:

        score += 15

    elif auth_score < 60:

        score += 10

    elif auth_score < 80:

        score += 5

    # ==================================
    # BRAND IMPERSONATION
    # ==================================

    if brand_analysis.get(
        "impersonation_detected",
        False
    ):
        score += 15

    # ==================================
    # TYPOSQUATTING
    # ==================================

    typosquat = (
        brand_analysis.get(
            "typosquat_analysis",
            {}
        )
    )

    if typosquat.get(
        "detected",
        False
    ):
        score += 20

    # ==================================
    # AUTHENTICATION ANALYSIS
    # ==================================

    if authentication_analysis.get(
        "credential_harvest_risk",
        False
    ):
        score += 15

    if authentication_analysis.get(
        "urgency_manipulation",
        False
    ):
        score += 10

    if authentication_analysis.get(
        "impersonation_detected",
        False
    ):
        score += 10

    # ==================================
    # CAP SCORE
    # ==================================

    if score > 100:
        score = 100

    if score < 0:
        score = 0

    return score