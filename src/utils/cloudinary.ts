export const uploadToCloudinary = async (
    file: File,
    folder: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'proveedores_app'); 
    formData.append('folder', folder);
    
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) throw new Error('Error subiendo archivo');
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error en Cloudinary:', error);
      throw error;
    }
  };