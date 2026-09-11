import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: (process.env.CLOUDINARY_CLOUD_NAME || 'mrocxxeh').trim(),
  api_key: (process.env.CLOUDINARY_API_KEY || '748358688425554').trim(),
  api_secret: (process.env.CLOUDINARY_API_SECRET || 'ODFBx6iXRT4zo5jOZZgCzWLwVhs').trim(),
  secure: true,
});

export async function uploadImage(fileBuffer, folder = 'techsolutionor') {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    ).end(fileBuffer);
  });
}

export async function deleteImage(publicId) {
  return await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
