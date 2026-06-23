import axios from "axios";

export async function getStats() {
  const response = await axios.get(
    "http://127.0.0.1:8000/stats"
  );

  return response.data;
}