const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export async function getStats() {
  const response = await fetch(
    `${API_URL}/stats`
  );

  return response.json();
}