export type BoundingBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type Severity = {
  label: "LOW" | "MEDIUM" | "HIGH";
  score: number;
  area_pct: number;
};

export type Detection = {
  class_id: number;
  class_name: string;
  confidence: number;
  bbox: BoundingBox;
  severity: Severity;
};

export type PredictResponse = {
  detections: Detection[];
  defect_counts: Record<string, number>;
  annotated_image: {
    format: string;
    encoding: string;
    data: string;
  };
  image_size: {
    width: number;
    height: number;
  };
};
