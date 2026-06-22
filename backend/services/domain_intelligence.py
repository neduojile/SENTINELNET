import re


TRUSTED_BRANDS = {
    "paypal": "paypal.com",
    "google": "google.com",
    "microsoft": "microsoft.com",
    "amazon": "amazon.com",
    "apple": "apple.com",
    "github": "github.com",
}


TYPOSQUAT_VARIANTS = {

    "paypal": [
        "paypa1",
        "paypai",
        "pay-pol",
        "paypal-login",
        "paypal-security",
        "paypal-verify"
    ],

    "google": [
        "g00gle",
        "goog1e",
        "google-login",
        "google-security"
    ],

    "amazon": [
        "arnazon",
        "amaz0n",
        "amazon-security",
        "amazon-login"
    ],

    "microsoft": [
        "micr0soft",
        "rnicrosoft",
        "microsoft-security",
        "microsoft-login"
    ],

    "apple": [
        "app1e",
        "apple-security",
        "apple-login"
    ]
}


def analyze_domain_reputation(content: str):

    content_lower = content.lower()

    detected_brand = None
    official_domain = None

    impersonation_detected = False
    risk_score = 0

    risk_level = "Low"

    urls = re.findall(
        r"https?://([a-zA-Z0-9.-]+)",
        content_lower
    )

    typosquat_detected = False
    matched_variant = None

    suspicious_keywords = [
        "login",
        "verify",
        "secure",
        "security",
        "account",
        "update",
        "suspended",
        "wallet"
    ]

    # ==================================
    # BRAND IMPERSONATION
    # ==================================

    for brand, official_domain_name in TRUSTED_BRANDS.items():

        if brand in content_lower:

            detected_brand = brand.title()

            official_domain = official_domain_name

            for url_domain in urls:

                if official_domain_name not in url_domain:

                    impersonation_detected = True

                    risk_score += 70

    # ==================================
    # TYPOSQUATTING
    # ==================================

    for brand, variants in TYPOSQUAT_VARIANTS.items():

        for variant in variants:

            for url_domain in urls:

                if variant in url_domain:

                    typosquat_detected = True

                    matched_variant = variant

                    detected_brand = brand.title()

                    official_domain = TRUSTED_BRANDS.get(
                        brand
                    )

                    risk_score += 95

    # ==================================
    # SUSPICIOUS DOMAIN KEYWORDS
    # ==================================

    for keyword in suspicious_keywords:

        for url_domain in urls:

            if keyword in url_domain:

                risk_score += 5

    # ==================================
    # CAP SCORE
    # ==================================

    if risk_score > 100:
        risk_score = 100

    # ==================================
    # RISK LEVEL
    # ==================================

    if risk_score >= 90:
        risk_level = "Critical"

    elif risk_score >= 70:
        risk_level = "High"

    elif risk_score >= 40:
        risk_level = "Medium"

    else:
        risk_level = "Low"

    return {

        "brand_detected":
        detected_brand,

        "official_domain":
        official_domain,

        "impersonation_detected":
        impersonation_detected,

        "risk_score":
        risk_score,

        "risk_level":
        risk_level,

        "typosquat_analysis": {

            "detected":
            typosquat_detected,

            "matched_variant":
            matched_variant,

            "target_brand":
            detected_brand
        }
    }