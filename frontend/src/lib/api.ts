import type { PredictResponse } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8000";

export async function predictImage(file: File): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/api/v1/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      text || "Prediction failed. Please check the backend connection.",
    );
  }

  return (await response.json()) as PredictResponse;
}
