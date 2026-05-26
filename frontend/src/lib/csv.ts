import type { Detection } from "./types";

const HEADERS = [
  "class_id",
  "class_name",
  "confidence",
  "bbox_x1",
  "bbox_y1",
  "bbox_x2",
  "bbox_y2",
  "severity_label",
  "severity_score",
  "severity_area_pct",
];

export function detectionsToCSV(detections: Detection[]): string {
  const rows = detections.map((detection) => [
    detection.class_id,
    detection.class_name,
    detection.confidence.toFixed(4),
    detection.bbox.x1.toFixed(2),
    detection.bbox.y1.toFixed(2),
    detection.bbox.x2.toFixed(2),
    detection.bbox.y2.toFixed(2),
    detection.severity.label,
    detection.severity.score.toFixed(4),
    detection.severity.area_pct.toFixed(2),
  ]);

  return [HEADERS, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(","))
    .join("\n");
}
