from database.threat_memory import get_connection


def save_threat(analysis):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT OR IGNORE INTO threats (

            fingerprint,
            threat_category,
            attack_family,
            delivery_vector,
            target_profile,
            objective,
            risk_level,
            intelligence_score,
            summary

        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            analysis.get("fingerprint"),
            analysis.get("threat_category"),
            analysis.get("attack_family"),
            analysis.get("delivery_vector"),
            analysis.get("target_profile"),
            analysis.get("objective"),
            analysis.get("risk_level"),
            analysis.get("intelligence_score"),
            analysis.get("summary"),
        ),
    )

    conn.commit()
    conn.close()