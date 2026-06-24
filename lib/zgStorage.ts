export async function uploadPdfTo0G(
  file: File
) {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

 const API_URL =
  process.env.NEXT_PUBLIC_API_URL!;

const response =
  await fetch(
    `${API_URL}/evidence/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {
    throw new Error(
      "Upload failed"
    );
  }

  return await response.json();
}