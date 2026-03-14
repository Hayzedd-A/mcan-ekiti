import { Schema, model, models } from "mongoose";

export interface IExecutive {
  _id: string;
  name: string;
  position: string;
  title: string;
  profilePic?: string;
  year: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExecutiveSchema = new Schema<IExecutive>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    title: { type: String, required: true },
    profilePic: { type: String },
    year: { type: String, required: true }, // e.g. "2025/26"
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Executive =
  models.Executive || model<IExecutive>("Executive", ExecutiveSchema);
export default Executive;
