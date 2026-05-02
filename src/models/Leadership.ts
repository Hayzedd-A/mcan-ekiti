import { Schema, model, models } from "mongoose";

export interface ILeadership {
  _id: string;
  name: string;
  position: string;
  title?: string;
  image?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeadershipSchema = new Schema<ILeadership>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    title: { type: String, required: false },
    image: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Leadership =
  models.Leadership || model<ILeadership>("Leadership", LeadershipSchema);
export default Leadership;
