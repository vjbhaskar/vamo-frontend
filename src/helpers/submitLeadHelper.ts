import apiClient from "../api/api";

export const submitLead = async (values: any) => {
  const formData = new FormData();

  const jsonBlob = JSON.parse(JSON.stringify(values));

  if (jsonBlob.project?.pictures) {
    jsonBlob.project.pictures.outdoorUnitLocation = [];
  }
  formData.append("data", JSON.stringify(jsonBlob));
  const rawFile = values.project?.pictures?.outdoorUnitLocation;
  if (rawFile) {
    const fileToUpload = Array.isArray(rawFile) ? rawFile[0] : rawFile;
    formData.append("outdoorUnitLocation", fileToUpload);
  }

  return await apiClient.post("/leads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
