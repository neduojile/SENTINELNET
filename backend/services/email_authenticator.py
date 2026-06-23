import re
from urllib.parse import urlparse


TRUSTED_DOMAINS = [
    "paypal.com",
    "google.com",
    "microsoft.com",
    "amazon.com",
    "apple.com",
    "github.com",
]


SUSPICIOUS_KEYWORDS = [
    "urgent",
    "verify now",
    "verify immediately",
    "account suspended",
    "click here",
    "immediately",
    "login now",
    "confirm identity",
    "reset password",
    "limited time",
    "security alert",
    "verify account",
    "update account",
    "confirm account",
    "action required",
]


def is_trusted_domain(domain: str):

    domain = domain.lower()

    for trusted in TRUSTED_DOMAINS:

        if domain == trusted:
            return True

        if domain.endswith("." + trusted):
            return True

    return False


def extract_sender_email(content: str):

    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        content
    )

    if emails:
        return emails[0]

    return None


def analyze_email_authenticity(content: str):

    score = 100

    sender_legitimacy = "Unknown"
    domain_reputation = "Unknown"

    impersonation_detected = False
    urgency_manipulation = False
    credential_harvest_risk = False

    content_lower = content.lower()

    # ==================================
    # SENDER ANALYSIS
    # ==================================

    sender_email = extract_sender_email(
        content
    )

    if sender_email:

        sender_domain = (
            sender_email
            .split("@")[1]
            .lower()
        )

        if is_trusted_domain(
            sender_domain
        ):
            sender_legitimacy = "Legitimate"

        else:
            sender_legitimacy = "Suspicious"

            impersonation_detected = True

            score -= 20

    # ==================================
    # PHISHING LANGUAGE
    # ==================================

    keyword_hits = 0

    for word in SUSPICIOUS_KEYWORDS:

        if word in content_lower:

            keyword_hits += 1

            urgency_manipulation = True

    score -= keyword_hits * 5

    # ==================================
    # URL ANALYSIS
    # ==================================

    urls = re.findall(
        r"https?://[^\s<>\"']+",
        content
    )

    for url in urls:

        try:

            parsed = urlparse(url)

            domain = (
                parsed.netloc
                .lower()
            )

            if is_trusted_domain(
                domain
            ):

                if (
                    domain_reputation
                    !=
                    "Suspicious"
                ):
                    domain_reputation = (
                        "Trusted"
                    )

            else:

                domain_reputation = (
                    "Suspicious"
                )

                impersonation_detected = True

                credential_harvest_risk = True

                score -= 30

        except Exception:
            pass

    # ==================================
    # PAYPAL IMPERSONATION
    # ==================================

    if (
        "paypal" in content_lower
        and
        "paypal.com" not in content_lower
    ):
        score -= 15

        impersonation_detected = True

    # ==================================
    # GOOGLE IMPERSONATION
    # ==================================

    if (
        "google" in content_lower
        and
        "google.com" not in content_lower
    ):
        score -= 15

        impersonation_detected = True

    # ==================================
    # MICROSOFT IMPERSONATION
    # ==================================

    if (
        "microsoft" in content_lower
        and
        "microsoft.com" not in content_lower
    ):
        score -= 15

        impersonation_detected = True

    # ==================================
    # SCORE NORMALIZATION
    # ==================================

    if score < 0:
        score = 0

    if score > 100:
        score = 100

    # ==================================
    # VERDICT
    # ==================================

    if score <= 20:

        verdict = "Phishing"

    elif score <= 40:

        verdict = "Likely Phishing"

    elif score <= 70:

        verdict = "Suspicious"

    elif score <= 90:

        verdict = "Likely Legitimate"

    else:

        verdict = "Legitimate"

    return {

        "email_verdict":
        verdict,

        "email_authenticity_score":
        score,

        "authentication_analysis": {

            "sender_legitimacy":
            sender_legitimacy,

            "domain_reputation":
            domain_reputation,

            "impersonation_detected":
            impersonation_detected,

            "urgency_manipulation":
            urgency_manipulation,

            "credential_harvest_risk":
            credential_harvest_risk,

            "suspicious_keyword_hits":
            keyword_hits,

            "sender_email":
            sender_email
        }
    }