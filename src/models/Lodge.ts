import { Schema, model, models } from "mongoose";

export interface ILodge {
  _id: string;
  title: string;
  description: string;
  status: "Available" | "Under Construction" | "Full";
  location: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LodgeSchema = new Schema<ILodge>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Available", "Under Construction", "Full"],
      default: "Available",
    },
    location: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const Lodge = models.Lodge || model<ILodge>("Lodge", LodgeSchema);
export default Lodge;
