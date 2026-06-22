from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.db import Base
from services.db import engine

# IMPORTANT
from models.threat import Threat

from api.analyze import router as analyze_router
from api.threats import router as threats_router
from api.stats import router as stats_router
from api.search import router as search_router


# Create PostgreSQL tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="SentinelNet",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(threats_router)
app.include_router(stats_router)
app.include_router(search_router)


@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "SentinelNet",
        "database": "PostgreSQL (Neon)",
        "engine": "SentinelNet Threat Genome Engine"
    }