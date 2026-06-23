import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function analyzeThreat(
  content: string
) {
  const response = await api.post(
    "/analyze",
    {
      content,
    }
  );

  return response.data;
}

export async function getStats() {
  const response = await api.get(
    "/stats"
  );

  return response.data;
}

export async function getThreats() {
  const response = await api.get(
    "/threats"
  );

  return response.data;
}

export default api;