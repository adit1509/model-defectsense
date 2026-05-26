from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.concurrency import run_in_threadpool

from .inference import get_service, init_model
from .schemas import PredictResponse
from .utils import ALLOWED_IMAGE_TYPES, load_image_from_bytes

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("defectsense")


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_model()
    logger.info("Model loaded and ready.")
    yield


app = FastAPI(
    title="DefectSense AI API",
    version="1.0.0",
    description="YOLOv8-powered building defect detection API.",
    lifespan=lifespan,
)


def _cors_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", "*").strip()
    if raw == "*":
        return ["*"]
    return [origin.strip() for origin in raw.split(",") if origin.strip()]


app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.post("/api/v1/predict", response_model=PredictResponse)
async def predict(file: UploadFile = File(...)) -> PredictResponse:
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=415,
            detail="Unsupported file type. Upload JPEG, PNG, or WEBP images.",
        )

    payload = await file.read()
    try:
        image = load_image_from_bytes(payload)
    except Exception as exc:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid image payload: {exc}",
        ) from exc

    service = get_service()
    return await run_in_threadpool(service.predict, image)
