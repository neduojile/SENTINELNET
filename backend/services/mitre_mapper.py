MITRE_ATTACK_MAP = {
    "Phishing": {
        "technique_id": "T1566",
        "name": "Phishing",
        "tactic": "Initial Access"
    },

    "Credential Theft": {
        "technique_id": "T1110",
        "name": "Brute Force / Credential Access",
        "tactic": "Credential Access"
    },

    "Ransomware": {
        "technique_id": "T1486",
        "name": "Data Encrypted for Impact",
        "tactic": "Impact"
    },

    "Malware": {
        "technique_id": "T1204",
        "name": "User Execution",
        "tactic": "Execution"
    },

    "Business Email Compromise": {
        "technique_id": "T1566.001",
        "name": "Spearphishing Attachment",
        "tactic": "Initial Access"
    },

    "Social Engineering": {
        "technique_id": "T1598",
        "name": "Phishing for Information",
        "tactic": "Reconnaissance"
    },

    "Wallet Drainer": {
        "technique_id": "T1656",
        "name": "Impersonation",
        "tactic": "Credential Access"
    }
}


def map_to_mitre(threat_category: str):

    return MITRE_ATTACK_MAP.get(
        threat_category,
        {
            "technique_id": "UNKNOWN",
            "name": "Unknown Technique",
            "tactic": "Unknown"
        }
    )