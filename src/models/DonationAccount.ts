import { Schema, model, models } from "mongoose";

export interface IDonationAccount {
  _id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const DonationAccountSchema = new Schema<IDonationAccount>({
  bankName: { type: String, required: true },
  accountName: { type: String, required: true },
  accountNumber: { type: String, required: true },
});

const DonationAccount =
  models.DonationAccount ||
  model<IDonationAccount>("DonationAccount", DonationAccountSchema);

export default DonationAccount;
