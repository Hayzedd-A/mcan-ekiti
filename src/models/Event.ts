import { Schema, model, models } from "mongoose";

export interface IEvent {
  _id: string;
  date: string;
  title: string;
  description: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  location: string;
  imageBanner?: string;
  cost?: number;
  occurrence: "One-time" | "Weekly" | "Monthly" | "Annual";
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    date: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    location: { type: String, required: true },
    imageBanner: { type: String },
    cost: { type: Number, default: 0 },
    occurrence: {
      type: String,
      enum: ["One-time", "Weekly", "Monthly", "Annual"],
      default: "One-time",
    },
  },
  { timestamps: true }
);

const Event = models.Event || model<IEvent>("Event", EventSchema);
export default Event;
