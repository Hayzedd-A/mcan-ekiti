import { Schema, model, models } from "mongoose";

export interface IGallery {
  _id: string;
  image: string;
  caption?: string;
  uploadedAt: Date;
}

const GallerySchema = new Schema<IGallery>({
  image: { type: String, required: true },
  caption: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const Gallery = models.Gallery || model<IGallery>("Gallery", GallerySchema);
export default Gallery;
