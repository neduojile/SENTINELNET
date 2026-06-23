import json
import hashlib

from services.groq_client import client
from services.scoring import calculate_intelligence_score
from services.mitre_mapper import map_to_mitre
from services.ioc_extractor import extract_iocs
from services.email_authenticator import analyze_email_authenticity
from services.domain_intelligence import (
    analyze_domain_reputation
)

SYSTEM_PROMPT = """
You are SentinelNet Threat Intelligence Analyst v4.

You are an expert cybersecurity analyst specializing in:

- Phishing
- Business Email Compromise
- Malware
- Ransomware
- Credential Theft
- Social Engineering
- Crypto Scams
- Insider Threats
- Supply Chain Attacks

TASK:

Determine whether the submitted content is:

1. Legitimate
2. Suspicious
3. Malicious

Extract all available threat intelligence.

Return ONLY JSON.

Required fields:

{
  "is_valid_threat": true,
  "threat_category": "",
  "attack_family": "",
  "delivery_vector": "",
  "target_profile": "",
  "objective": "",
  "risk_level": "",
  "confidence": 0,
  "summary": "",
  "confidence_reason": "",
  "recommended_actions": [],
  "iocs": {
    "domains": [],
    "emails": [],
    "ips": [],
    "wallets": [],
    "urls": [],
    "phone_numbers": [],
    "file_hashes": []
  }
}

Rules:

1. Never return markdown.
2. Never return explanations outside JSON.
3. Confidence must be 0-100.
4. Risk level must be:
   - Critical
   - High
   - Medium
   - Low
5. Do not invent IOCs.
6. Legitimate emails must not be marked phishing.
7. If insufficient evidence exists, use Unknown.
"""


def generate_fingerprint(
    attack_family: str,
    delivery_vector: str,
    target_profile: str,
    risk_level: str,
    content: str,
):
    raw = (
        attack_family
        + delivery_vector
        + target_profile
        + risk_level
        + content
    )

    digest = hashlib.sha256(
        raw.encode()
    ).hexdigest()[:12]

    return f"TG-{digest.upper()}"

def analyze_threat(content: str):

    content = content.strip()

    # ==================================
    # INVALID INPUT DETECTION
    # ==================================

    if content.lower() in [
        "hello",
        "hi",
        "test",
        "testing",
        "good morning",
        "good afternoon",
    ]:
        return {
            "is_valid_threat": False,
            "validity_reason": "Non-threat content detected"
        }

    if len(content) < 20:
        return {
            "is_valid_threat": False,
            "validity_reason": "Insufficient threat intelligence provided"
        }

    # ==================================
    # GROQ ANALYSIS
    # ==================================

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0,
        response_format={
            "type": "json_object"
        },
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": content
            }
        ]
    )

    raw = response.choices[0].message.content

    print("\n========== GROQ RESPONSE ==========")
    print(raw)
    print("===================================\n")

    try:

        data = json.loads(raw)

    except Exception as e:

        print(
            "JSON PARSE ERROR:",
            str(e)
        )

        return {
            "is_valid_threat": False,
            "validity_reason": "Unable to parse intelligence response"
        }

    # ==================================
    # DEFAULT FIELDS
    # ==================================

    defaults = {
        "threat_category": "Unknown",
        "attack_family": "Unknown",
        "delivery_vector": "Unknown",
        "target_profile": "Unknown",
        "objective": "Unknown",
        "risk_level": "Medium",
        "confidence": 0,
        "summary": "",
        "confidence_reason": "",
        "recommended_actions": [],
        "iocs": {
            "domains": [],
            "emails": [],
            "ips": [],
            "wallets": [],
            "urls": [],
            "phone_numbers": [],
            "file_hashes": []
        }
    }

    for key, value in defaults.items():
        data.setdefault(
            key,
            value
        )

    if not data.get(
        "is_valid_threat",
        True
    ):
        return data

    # ==================================
    # IOC EXTRACTION
    # ==================================

    regex_iocs = extract_iocs(
        content
    )

    ioc_statistics = regex_iocs.pop(
        "ioc_statistics",
        {}
    )

    for key, values in regex_iocs.items():

        existing = data["iocs"].get(
            key,
            []
        )

        data["iocs"][key] = list(
            set(existing + values)
        )

    data["ioc_statistics"] = (
        ioc_statistics
    )

    # ==================================
    # EMAIL ANALYSIS
    # ==================================

    email_analysis = (
        analyze_email_authenticity(
            content
        )
    )

    data.update(
        email_analysis
    )

    # ==================================
    # DOMAIN / BRAND ANALYSIS
    # ==================================

    domain_analysis = (
        analyze_domain_reputation(
            content
        )
    )

    data["brand_analysis"] = (
        domain_analysis
    )

    # ==================================
    # INTELLIGENCE SCORE
    # ==================================

    data["intelligence_score"] = (
        calculate_intelligence_score(
            data
        )
    )

    # ==================================
    # MITRE ATT&CK
    # ==================================

    try:

        data["mitre_attack"] = (
            map_to_mitre(
                data.get(
                    "threat_category",
                    "Unknown"
                )
            )
        )

    except Exception:

        data["mitre_attack"] = {
            "technique_id": "UNKNOWN",
            "name": "Unknown Technique",
            "tactic": "Unknown"
        }

    # ==================================
    # FINGERPRINT
    # ==================================

    data["fingerprint"] = (
        generate_fingerprint(
            data.get(
                "attack_family",
                ""
            ),
            data.get(
                "delivery_vector",
                ""
            ),
            data.get(
                "target_profile",
                ""
            ),
            data.get(
                "risk_level",
                ""
            ),
            content
        )
    )

    return data