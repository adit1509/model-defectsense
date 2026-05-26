from __future__ import annotations

import base64
from io import BytesIO
from typing import Tuple

import cv2
import numpy as np
from PIL import Image

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}


def load_image_from_bytes(data: bytes) -> Tuple[np.ndarray, int, int]:
    if not data:
        raise ValueError("Empty image payload.")
    with Image.open(BytesIO(data)) as img:
        rgb = img.convert("RGB")
        np_img = np.array(rgb)
    height, width = np_img.shape[:2]
    return np_img, width, height


def encode_image_base64(image: np.ndarray) -> str:
    success, encoded = cv2.imencode(".png", image)
    if not success:
        raise ValueError("Failed to encode image.")
    return base64.b64encode(encoded.tobytes()).decode("utf-8")


def compute_severity(
    x1: float,
    y1: float,
    x2: float,
    y2: float,
    img_w: int,
    img_h: int,
    confidence: float,
) -> Tuple[str, float, float]:
    area_ratio = ((x2 - x1) * (y2 - y1)) / float(img_w * img_h)
    if area_ratio > 0.15 or confidence < 0.45:
        label = "HIGH"
    elif area_ratio >= 0.05:
        label = "MEDIUM"
    else:
        label = "LOW"
    return label, area_ratio, area_ratio * 100.0
