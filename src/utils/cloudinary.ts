// src/utils/cloudinary.ts
export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al subir archivo');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error en uploadToCloudinary:', error);
    throw error;
  }
}