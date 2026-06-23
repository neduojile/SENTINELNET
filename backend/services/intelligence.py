import ast

from services.threat_memory import (
    find_similar_threats
)


def calculate_ioc_overlap(
    current_iocs: dict,
    stored_iocs: dict
):

    score = 0

    categories = [
        "domains",
        "urls",
        "emails",
        "ips",
        "wallets",
        "phone_numbers",
        "file_hashes"
    ]

    for category in categories:

        current = set(
            current_iocs.get(
                category,
                []
            )
        )

        stored = set(
            stored_iocs.get(
                category,
                []
            )
        )

        overlap = current.intersection(
            stored
        )

        score += len(
            overlap
        ) * 15

    return score


def genome_match(
    result: dict
):

    if not result.get(
        "is_valid_threat",
        True
    ):
        return {
            "matches_found": 0,
            "related_fingerprints": [],
            "similarity_score": 0
        }

    matches = find_similar_threats(
        result.get(
            "attack_family",
            ""
        ),
        result.get(
            "delivery_vector",
            ""
        ),
        result.get(
            "target_profile",
            ""
        )
    )

    fingerprints = []

    similarity_scores = []

    current_iocs = result.get(
        "iocs",
        {}
    )

    for threat in matches:

        # Prevent self match

        if (
            threat.fingerprint
            ==
            result.get(
                "fingerprint"
            )
        ):
            continue

        score = 0

        # Attack Family

        if (
            threat.attack_family
            ==
            result.get(
                "attack_family"
            )
        ):
            score += 20

        # Delivery Vector

        if (
            threat.delivery_vector
            ==
            result.get(
                "delivery_vector"
            )
        ):
            score += 15

        # Target Profile

        if (
            threat.target_profile
            ==
            result.get(
                "target_profile"
            )
        ):
            score += 15

        # Risk Level

        if (
            threat.risk_level
            ==
            result.get(
                "risk_level"
            )
        ):
            score += 10

        # Threat Category

        if (
            threat.threat_category
            ==
            result.get(
                "threat_category"
            )
        ):
            score += 15

        # IOC Correlation

        try:

            stored_iocs = {

                "domains":
                ast.literal_eval(
                    threat.domains or "[]"
                ),

                "urls":
                ast.literal_eval(
                    threat.urls or "[]"
                ),

                "emails":
                ast.literal_eval(
                    threat.emails or "[]"
                ),

                "ips":
                ast.literal_eval(
                    threat.ips or "[]"
                ),

                "wallets":
                ast.literal_eval(
                    threat.wallets or "[]"
                ),

                "phone_numbers":
                ast.literal_eval(
                    threat.phone_numbers or "[]"
                ),

                "file_hashes":
                ast.literal_eval(
                    threat.file_hashes or "[]"
                )
            }

            score += calculate_ioc_overlap(
                current_iocs,
                stored_iocs
            )

        except Exception as e:

            print(
                "IOC CORRELATION ERROR:",
                str(e)
            )

        if score > 100:
            score = 100

        similarity_scores.append(
            score
        )

        fingerprints.append(
            {
                "fingerprint":
                threat.fingerprint,

                "similarity":
                score,

                "attack_family":
                threat.attack_family,

                "risk_level":
                threat.risk_level
            }
        )

    average_similarity = 0

    if similarity_scores:

        average_similarity = round(
            sum(
                similarity_scores
            )
            /
            len(
                similarity_scores
            )
        )

    return {

        "matches_found":
        len(
            fingerprints
        ),

        "similarity_score":
        average_similarity,

        "related_fingerprints":
        fingerprints
    }