import mongoose, { Document, model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import generateUniqueAccountNumber from "../utils/generateAccountNumber";

// Define an interface for the user document
interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: number;
  dateOfBirth: Date;
  profilePicture: string;
  dateOfRegistration: Date;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  verificationToken: string;
  isVerified: boolean;
  accountNumber: string;
  verified: Date;
  accountBalance: number;
  comparePassword(password: string): boolean;
}

// Define the Mongoose schema for the user
const UserSchema = new mongoose.Schema<IUserDocument>({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Field required"],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
    required: [true, "Field required"],
    minlength: 3,
    maxlength: 50,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
    minlength: 11,
    maxlength: 11,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    // required:true,
  },
  profilePicture: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  accountNumber: {
    type: String,
    unique: true,
  },
  dateOfRegistration: {
    type: Date,
    default: Date.now(),
  },

  accountBalance: {
    type: Number,
    default: 0.0,
  },
  passwordToken: { type: String },
  passwordTokenExpirationDate: { type: Date },
  verificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verified: Schema.Types.Date,
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (
  canditatePassword: string
) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.pre("save", async function (next) {
  const user = this as IUserDocument;

  // Only generate an account number if it's not already set
  if (!user.accountNumber) {
    const accountNumber = await generateUniqueAccountNumber();
    user.accountNumber = accountNumber;
  }

  next();
});

// Create and export the Mongoose model
const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
