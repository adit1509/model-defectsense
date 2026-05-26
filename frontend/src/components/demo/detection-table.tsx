import type { Detection } from "@/lib/types";

import { SeverityPill } from "@/components/demo/severity-pill";

type DetectionTableProps = {
  detections: Detection[];
};

export function DetectionTable({ detections }: DetectionTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Class</th>
            <th className="px-4 py-3">Confidence</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">BBox</th>
          </tr>
        </thead>
        <tbody>
          {detections.map((det, index) => (
            <tr
              key={`${det.class_id}-${index}`}
              className="border-t border-slate-100"
            >
              <td className="px-4 py-3 font-semibold text-slate-900">
                {det.class_name}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {(det.confidence * 100).toFixed(1)}%
              </td>
              <td className="px-4 py-3">
                <SeverityPill label={det.severity.label} />
              </td>
              <td className="px-4 py-3 text-slate-500">
                {det.bbox.x1.toFixed(0)}, {det.bbox.y1.toFixed(0)} →{" "}
                {det.bbox.x2.toFixed(0)}, {det.bbox.y2.toFixed(0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
