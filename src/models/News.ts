import { Schema, model, models } from "mongoose";

export interface INews {
  _id: string;
  title: string;
  shortDescription: string;
  story: string; // HTML content
  category: string;
  image?: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    story: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const News = models.News || model<INews>("News", NewsSchema);
export default News;
