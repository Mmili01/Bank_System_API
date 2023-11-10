import  mongoose, { Document,  model } from "mongoose";

interface ITokenDocument extends Document {
  refreshToken: string;
  ip: string;
  userAgent: string;
  isValid: boolean;
  user: object;
}

const TokenSchema = new mongoose.Schema<ITokenDocument>(
  {
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TokenModel = model<ITokenDocument>("Token", TokenSchema)

export default TokenModel