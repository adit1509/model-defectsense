from __future__ import annotations

import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List

import numpy as np
from ultralytics import YOLO

from .schemas import AnnotatedImage, BoundingBox, Detection, ImageSize, PredictResponse, Severity
from .utils import compute_severity, encode_image_base64

logger = logging.getLogger(__name__)

def _default_model_path() -> Path:
    base_dir = Path(__file__).resolve().parents[1]
    return base_dir / "runs" / "yolov8m_mbdd2025" / "weights" / "best.pt"


def _load_class_names(model: YOLO) -> List[str]:
    names = model.names
    if isinstance(names, dict):
        return [names[idx] for idx in sorted(names)]
    if isinstance(names, list):
        return names
    return [str(name) for name in names]


@dataclass
class InferenceConfig:
    conf_threshold: float
    imgsz: int
    device: str | None

    @classmethod
    def from_env(cls) -> "InferenceConfig":
        return cls(
            conf_threshold=float(os.getenv("CONF_THRESHOLD", "0.25")),
            imgsz=int(os.getenv("IMG_SIZE", "640")),
            device=os.getenv("MODEL_DEVICE"),
        )


@dataclass
class InferenceService:
    model: YOLO
    class_names: List[str]
    config: InferenceConfig

    def predict(self, image: np.ndarray) -> PredictResponse:
        height, width = image.shape[:2]
        results = self.model.predict(
            image,
            conf=self.config.conf_threshold,
            imgsz=self.config.imgsz,
            verbose=False,
            device=self.config.device,
        )
        result = results[0]
        detections: List[Detection] = []
        defect_counts: Dict[str, int] = {name: 0 for name in self.class_names}

        for box in result.boxes:
            x1, y1, x2, y2 = [float(v) for v in box.xyxy[0].tolist()]
            confidence = float(box.conf[0])
            class_id = int(box.cls[0])
            class_name = (
                self.class_names[class_id]
                if class_id < len(self.class_names)
                else str(class_id)
            )
            severity_label, severity_score, area_pct = compute_severity(
                x1, y1, x2, y2, width, height, confidence
            )
            if class_name not in defect_counts:
                defect_counts[class_name] = 0
            defect_counts[class_name] += 1
            detections.append(
                Detection(
                    class_id=class_id,
                    class_name=class_name,
                    confidence=confidence,
                    bbox=BoundingBox(x1=x1, y1=y1, x2=x2, y2=y2),
                    severity=Severity(
                        label=severity_label,
                        score=severity_score,
                        area_pct=area_pct,
                    ),
                )
            )

        annotated = result.plot()
        encoded = encode_image_base64(annotated)

        return PredictResponse(
            detections=detections,
            defect_counts=defect_counts,
            annotated_image=AnnotatedImage(data=encoded),
            image_size=ImageSize(width=width, height=height),
        )


_service: InferenceService | None = None


def init_model() -> InferenceService:
    global _service
    model_path = Path(os.getenv("MODEL_PATH", str(_default_model_path()))).expanduser()
    if not model_path.exists():
        raise FileNotFoundError(f"Model weights not found at: {model_path}")
    logger.info("Loading YOLOv8 model from %s", model_path)
    model = YOLO(str(model_path))
    class_names = _load_class_names(model)
    config = InferenceConfig.from_env()
    _service = InferenceService(model=model, class_names=class_names, config=config)
    return _service


def get_service() -> InferenceService:
    if _service is None:
        raise RuntimeError("Model not initialized. Call init_model() at startup.")
    return _service
