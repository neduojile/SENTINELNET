import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL!;

export async function uploadEvidence(
  file: File
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axios.post(
      `${API_URL}/evidence/upload`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
}