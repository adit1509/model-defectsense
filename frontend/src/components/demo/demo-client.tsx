"use client";

import type { DragEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { DetectionTable } from "@/components/demo/detection-table";
import { SeverityPill } from "@/components/demo/severity-pill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { predictImage } from "@/lib/api";
import { detectionsToCSV } from "@/lib/csv";
import type { PredictResponse } from "@/lib/types";

const SEVERITY_COLORS: Record<string, string> = {
  HIGH: "#f43f5e",
  MEDIUM: "#f59e0b",
  LOW: "#10b981",
};

export default function DemoClient() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const onSelectFile = (selected: File | null) => {
    if (!selected) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(selected);
    setError(null);
    setResult(null);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleDrop = (dropEvent: DragEvent<HTMLDivElement>) => {
    dropEvent.preventDefault();
    setDragActive(false);
    const droppedFile = dropEvent.dataTransfer.files?.[0];
    if (droppedFile) onSelectFile(droppedFile);
  };

  const handlePredict = async () => {
    if (!file) {
      setError("Upload an image to run inference.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to reach the inference service.",
      );
    } finally {
      setLoading(false);
    }
  };

  const severityData = useMemo(() => {
    const counts = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    result?.detections.forEach((det) => {
      counts[det.severity.label] += 1;
    });
    return Object.entries(counts).map(([label, value]) => ({
      label,
      value,
      color: SEVERITY_COLORS[label],
    }));
  }, [result]);

  const defectChart = useMemo(
    () =>
      Object.entries(result?.defect_counts ?? {}).map(([label, value], idx) => ({
        label,
        value,
        color: idx % 2 === 0 ? "#2563eb" : "#38bdf8",
      })),
    [result],
  );

  const averageConfidence = useMemo(() => {
    if (!result?.detections.length) return 0;
    const total = result.detections.reduce(
      (sum, det) => sum + det.confidence,
      0,
    );
    return (total / result.detections.length) * 100;
  }, [result]);

  const handleDownload = () => {
    if (!result?.detections.length) return;
    const csv = detectionsToCSV(result.detections);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "detections.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <Card className="space-y-6">
        <div>
          <Badge>Smart Upload</Badge>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            Detect infrastructure defects instantly
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Drag and drop an image or select a file. We will run YOLOv8
            inference and return annotated imagery in seconds.
          </p>
        </div>
        <div
          className={`rounded-3xl border-2 border-dashed p-6 text-center transition ${
            dragActive
              ? "border-primary-500 bg-primary-50"
              : "border-slate-200 bg-slate-50"
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <span className="text-xl">📸</span>
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Drop image here or click to upload
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Supports JPG, PNG, WEBP • Max 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => onSelectFile(event.target.files?.[0] ?? null)}
          />
        </div>

        {previewUrl && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Image preview
              </p>
              <button
                type="button"
                onClick={clearFile}
                className="text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Clear
              </button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <Image
                src={previewUrl}
                alt="Preview"
                width={1200}
                height={800}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={handlePredict} disabled={loading}>
            {loading ? "Running inference..." : "Run defect analysis"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={handleDownload}
            disabled={!result?.detections.length}
          >
            Download CSV
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Annotated output
              </p>
              <p className="text-xs text-slate-500">
                Bounding boxes and severity labels
              </p>
            </div>
            <Badge>Live</Badge>
          </div>
          {result?.annotated_image ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src={`data:image/${result.annotated_image.format};base64,${result.annotated_image.data}`}
                alt="Annotated"
                width={result.image_size.width}
                height={result.image_size.height}
                className="h-auto w-full"
                unoptimized
              />
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-400">
              Annotated image will appear here after inference.
            </div>
          )}
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Detection summary
              </p>
              <p className="text-xs text-slate-500">
                Confidence, counts, and severity
              </p>
            </div>
            <SeverityPill label={result ? "HIGH" : "LOW"} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Detections</p>
              <p className="text-2xl font-semibold text-slate-900">
                {result?.detections.length ?? 0}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Avg confidence</p>
              <p className="text-2xl font-semibold text-slate-900">
                {averageConfidence.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Image size</p>
              <p className="text-2xl font-semibold text-slate-900">
                {result
                  ? `${result.image_size.width}×${result.image_size.height}`
                  : "—"}
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Defect counts
              </p>
              {defectChart.length ? (
                <BarChart data={defectChart} />
              ) : (
                <p className="text-sm text-slate-400">
                  No defect counts yet.
                </p>
              )}
            </div>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Severity split
              </p>
              <DonutChart data={severityData} />
            </div>
          </div>
        </Card>
      </div>
      {result?.detections.length ? (
        <div className="lg:col-span-2">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Detection table
                </h3>
                <p className="text-sm text-slate-500">
                  {result.detections.length} detections returned.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Severity</span>
                <SeverityPill label="HIGH" />
                <SeverityPill label="MEDIUM" />
                <SeverityPill label="LOW" />
              </div>
            </div>
            <DetectionTable detections={result.detections} />
          </Card>
        </div>
      ) : null}
    </div>
  );
}
