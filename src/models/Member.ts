import { Schema, model, models } from "mongoose";

export interface IMember {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  stateCode: string;
  ppa: string;
  lga: string;
  gender: "male" | "female";
  registeredAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    stateCode: { type: String, required: true },
    ppa: { type: String, required: true },
    lga: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    registeredAt: { type: Date, default: Date.now },
  }
);

const Member = models.Member || model<IMember>("Member", MemberSchema);
export default Member;
