import { Request, Response } from "express";
import UserModel from "../models/User";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError, BadRequestError } from "../errors/index";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import generateUniqueAccountNumber from "../utils/generateAccountNumber";
import * as crypto from "crypto";
import { attachCookiesToResponse } from "../utils/jwt";
// import sendResetPasswordEmail from "../utils/sendResetPassword";
import sendVerificationEmail from "../utils/sendVerificationEmail";
// import createTokenUser from "../utils/createTokenUser";
import TokenModel from "../models/Token";

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
      throw new BadRequestError("User already exists");
    }

    const verificationToken = crypto.randomBytes(40).toString("hex");
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
      verificationToken,
    });
    generateUniqueAccountNumber();

    const tokenUser = {
      firstname: user.firstName,
      lastName: user.lastName,
      surname: user.surname,
      id: user._id,
      username: user.username,
      phoneNumber: user.phoneNumber,
      accountNumber: user.accountNumber,
    };
    const token = jwt.sign(tokenUser, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_LIFETIME,
    });

    const origin = "http://localhost:8000";

    await sendVerificationEmail({
      username: user.username,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });
    res.status(StatusCodes.CREATED).json({
      msg: "Success! Please verify your email",
      firstname: tokenUser.firstname,
      lastname: tokenUser.lastName,
      surname: tokenUser.surname,
      username: tokenUser.username,
      id: tokenUser.id,
      phoneNumber: tokenUser.phoneNumber,
      accountNumber: tokenUser.accountNumber,
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
    throw new BadRequestError("Parameters cannot be empty ");
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnauthenticatedError("Invalid credentials ");
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError("please verify your email");
  }

  const tokenUser = {
    firstname: user.firstName,
    lastName: user.lastName,
    surname: user.surname,
    id: user._id,
    username: user.username,
    phoneNumber: user.phoneNumber,
    accountNumber: user.accountNumber,
  };

  let refreshToken = "";
  const existingToken = await TokenModel.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse(
      res,
      {
        firstname: tokenUser.firstname,
        lastname: tokenUser.lastName,
        surname: tokenUser.surname,
        username: tokenUser.username,
        id: tokenUser.id,
        phoneNumber: tokenUser.phoneNumber,
        accountNumber: tokenUser.accountNumber,
      },
      refreshToken
    );

    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await TokenModel.create(userToken);

  attachCookiesToResponse(res, tokenUser, refreshToken);

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token, email } = req.query;
  console.log(token, email);

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("what is wrong");
  }

  if (user.verificationToken !== token) {
    throw new UnauthenticatedError(" Failed");
  }

  console.log(" Token:", token);
  console.log("User's  Token:", user.verificationToken);

  user.isVerified = true;
  user.verified = new Date();
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified!!" });
};
const forgotPassword = async (_req: Request, res: Response) => {
  res.send("forgot password ");
};
export const logout = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as { userId?: string }).userId;
    if (userId) {
      await TokenModel.findOneAndDelete({ user: req.user.userId });
    }
    res.cookie('accessToken', 'logout',{
      httpOnly:true,
      expires: new Date(Date.now())
    })
    res.cookie('refreshToken','logout',{
      httpOnly:true,
      expires:new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({msg:'User Looged out'})
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'})
  }

  res.send("logout User");
};

export default {
  register,
  login,
  verifyEmail,
  forgotPassword,
  logout,
};
