import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "@/config/constants";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  buffer: Buffer,
  folder: string = "mcan-ekiti",
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result)
          return reject(error ?? new Error("Upload failed"));
        resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}

export async function deleteImage(imgUrl: string): Promise<void> {
  try {
    const publicId = extractPublicId(imgUrl);
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    console.error("delete image error: ", e);
  }
}

export function extractPublicId(url: string): string {
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return "";

  let path = url.substring(uploadIndex + 8); // after '/upload/'

  // Remove version if present (e.g. v12345/)
  if (path.startsWith("v")) {
    const firstSlash = path.indexOf("/");
    path = path.substring(firstSlash + 1);
  }

  // Remove file extension
  return path.replace(/\.[^/.]+$/, "");
}

export default cloudinary;
