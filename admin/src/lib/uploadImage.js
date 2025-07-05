export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");
  formData.append("dspr357vd", "dspr357vd");

  const res = await fetch("https://api.cloudinary.com/v1_1/dspr357vd/image/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const result = await res.json();
  return result.secure_url;
};
