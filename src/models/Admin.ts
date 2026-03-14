import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin {
  _id: string;
  email: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);


const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);
export default Admin;
