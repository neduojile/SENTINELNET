from fastapi import APIRouter

from schemas.threat import ThreatAnalysisRequest

from agents.genome_agent import analyze_threat

from services.threat_memory import save_threat
from services.intelligence import genome_match

router = APIRouter()


@router.post("/analyze")
async def analyze(request: ThreatAnalysisRequest):

    result = analyze_threat(
        request.content
    )

    # ----------------------------------
    # INVALID THREAT
    # ----------------------------------

    if not result.get(
        "is_valid_threat",
        True
    ):
        return {
            "success": False,
            "analysis": result,
            "memory_match": None
        }

    # ----------------------------------
    # SAVE VALID THREAT
    # ----------------------------------

    try:

        save_threat(
            request.content,
            result
        )

    except Exception as e:

        print(
            "SAVE ERROR:",
            str(e)
        )

    # ----------------------------------
    # MEMORY CORRELATION
    # ----------------------------------

    try:

        match_data = genome_match(
            result
        )

    except Exception as e:

        print(
            "MATCH ERROR:",
            str(e)
        )

        match_data = {
            "matches_found": 0,
            "similarity_score": 0,
            "related_fingerprints": []
        }

    # ----------------------------------
    # RESPONSE
    # ----------------------------------

    return {
        "success": True,

        "analysis": result,

        "memory_match": match_data,

        "platform_metadata": {
            "engine": "SentinelNet Threat Genome Engine",
            "version": "2.0",
            "analysis_type": "AI Threat Intelligence",
            "memory_enabled": True,
            "ioc_extraction": True,
            "risk_scoring": True,
            "threat_correlation": True
        }
    }