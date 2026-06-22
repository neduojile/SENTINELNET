import axios from "axios";

const api = axios.create({
 baseURL: "http://127.0.0.1:8000",
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