from __future__ import annotations

from typing import Dict, List

from pydantic import BaseModel, Field


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float


class Severity(BaseModel):
    label: str = Field(..., description="LOW | MEDIUM | HIGH")
    score: float = Field(..., description="Area ratio of the defect in the image")
    area_pct: float = Field(..., description="Area ratio as a percentage")


class Detection(BaseModel):
    class_id: int
    class_name: str
    confidence: float
    bbox: BoundingBox
    severity: Severity


class AnnotatedImage(BaseModel):
    format: str = Field("png", description="Image format")
    encoding: str = Field("base64", description="Encoding type")
    data: str = Field(..., description="Base64-encoded annotated image")


class ImageSize(BaseModel):
    width: int
    height: int


class PredictResponse(BaseModel):
    detections: List[Detection]
    defect_counts: Dict[str, int]
    annotated_image: AnnotatedImage
    image_size: ImageSize
