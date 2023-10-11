import mongoose, { Document,  model } from "mongoose";
import validator from "validator";

// Define an interface for the user document
interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  surname:string;
  username:string;
  email: string;
  password: string;
  role:string;
  phoneNumber: number;
  dateOfBirth: Date;
  profilePicture:string;
  dateOfRegistration:Date
  passwordToken:string;
  passwordTokenExpirationDate:Date;
  verificationToken:string
  isVerified:boolean;
  
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
  dateOfBirth:{
    type:Date,
    required:true,
  },
  profilePicture:{
    type:String,
    default: '/uploads/example.jpeg',
  },
  dateOfRegistration:{
    type:Date,
    default:Date.now()
  },
  passwordToken:{type: String},
  passwordTokenExpirationDate:{type: Date},
  verificationToken: String,
  isVerified:{
    type:Boolean,
    default:false
  },
});

// Create and export the Mongoose model
const UserModel = model<IUserDocument>("User", UserSchema);

export default UserModel;
