import sqlite3
from pathlib import Path

DB_PATH = Path("sentinel_memory.db")


def get_connection():
    return sqlite3.connect(DB_PATH)


def initialize_database():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS threats (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            fingerprint TEXT UNIQUE,

            threat_category TEXT,

            attack_family TEXT,

            delivery_vector TEXT,

            target_profile TEXT,

            objective TEXT,

            risk_level TEXT,

            intelligence_score INTEGER,

            summary TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
        """
    )

    conn.commit()
    conn.close()