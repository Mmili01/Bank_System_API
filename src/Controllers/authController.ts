import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// interface userDetails{
//   firstName:string
//     lastName:string
//     surname:string
//     email:string
//     password:string
//     username:string
//     phoneNumber:number
//     dateOfBirth:Date
//     profilePicture:string
//     _id:number
// }

export const register = async (req: Request, res: Response) => {
  const {
    email,
    firstName,
    lastName,
    surname,
    password,
    username,
    phoneNumber,
    dateOfBirth,
    profilePicture,
  } = req.body;

  try {
    const alreadyExists = await UserModel.findOne({ email, phoneNumber });

    if (alreadyExists) {
      throw new CustomAPIError.BadRequestError("User already exists");
    }
    const user = await UserModel.create({
      firstName,
      lastName,
      surname,
      email,
      password,
      username,
      phoneNumber,
      dateOfBirth,
      profilePicture,
    });
    const tokenUser = {
      firstname: user.firstName,
      lastName: user.lastName,
      surname: user.surname,
      id: user._id,
      username: user.username,
      phoneNumber: user.phoneNumber,
    };
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    res.status(StatusCodes.CREATED).json({
      msg: "Success! Please verify your email",
      firstname: tokenUser.firstname,
      lastname: tokenUser.lastName,
      surname: tokenUser.surname,
      username: tokenUser.username,
      id: tokenUser.id,
      phoneNumber: tokenUser.phoneNumber,
      token,
    });
  } catch (error) {
    // Handle other potential errors here
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "An error occurred during registration",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError.BadRequestError("Parameters cannot be empty ");
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new CustomAPIError.UnauthenticatedError("Invalid credentials");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new CustomAPIError.UnauthenticatedError("Invalid credentials ");
  }
  // if (!user.isVerified) {
  //   throw new CustomAPIError.UnauthenticatedError("please verify your email");
  // }

  res.status(StatusCodes.OK).json({ user });
};
const verifyEmail = async (_req: Request, res: Response) => {
  res.send("verify User");
};
const forgotPassword = async (_req: Request, res: Response) => {
  res.send("forgot password ");
};
export const logout = async (_req: Request, res: Response) => {
  res.send("logout User");
};

export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  logout,
};
