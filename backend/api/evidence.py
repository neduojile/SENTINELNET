from fastapi import APIRouter, UploadFile, File
import hashlib

router = APIRouter()

@router.post("/evidence/upload")
async def upload_evidence(
    file: UploadFile = File(...)
):
    content = await file.read()

    file_hash = hashlib.sha256(
        content
    ).hexdigest()

    return {
        "success": True,
        "rootHash": file_hash,
        "txHash": "demo-tx-hash"
    }