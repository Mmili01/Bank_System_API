import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors";

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

  res.status(StatusCodes.CREATED).json({user,
    msg: "success please verify your email",
  });
};



export const login = async (req: Request,_res: Response) => {
    const {username, password} = req.body
    if(!username || !password){
        throw new CustomAPIError.BadRequestError("Parameters cannot be empty ")
    }

    const user = await UserModel.findOne({username})

    if(!user){
        throw new CustomAPIError.UnauthenticatedError("User doesn't exist")
    }



  ;
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
