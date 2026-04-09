import mongoose, { Schema, model, models } from "mongoose";

export interface IContactSettings {
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  mapsUrl: string;
}

const ContactSettingsSchema = new Schema<IContactSettings>(
  {
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    mapsUrl: { type: String, required: true },
  },
  { timestamps: true },
);

const ContactSettings =
  models.ContactSettings ||
  model<IContactSettings>("ContactSettings", ContactSettingsSchema);
export default ContactSettings;
