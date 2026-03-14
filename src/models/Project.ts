import { Schema, model, models } from "mongoose";

export interface IProject {
  _id: string;
  title: string;
  description: string;
  projectedAmount: number;
  amountRaised: number;
  status: "Ongoing" | "Completed" | "Paused";
  location: string;
  projectedDate?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectedAmount: { type: Number, default: 0 },
    amountRaised: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Paused"],
      default: "Ongoing",
    },
    location: { type: String, required: true },
    projectedDate: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Project = models.Project || model<IProject>("Project", ProjectSchema);
export default Project;
