import mongoose, { Document, model } from "mongoose";

interface IAccountBalanceDocument extends Document {
  user: string; // Reference to the user
  balance: number; // Account balance amount
  currency: string; // Currency code (e.g., "USD", "EUR")
  createdAt: Date;
  updatedAt: Date;
}

const accountBalanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const accountModel = model<IAccountBalanceDocument>(
  "AccountBalance",
  accountBalanceSchema
);
export default accountModel;
