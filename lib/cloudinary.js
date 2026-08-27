import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dqghun7oj',
  api_key: process.env.CLOUDINARY_API_KEY || '281487587427693',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'bxbrN76auL9pNUINMVdKJwqv6Uo',
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
