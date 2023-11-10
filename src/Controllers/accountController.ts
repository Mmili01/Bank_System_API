import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import UserModel from "../models/User";

export const getAllAccounts = async (_req: Request, res: Response) => {
  try {
    const accounts = await UserModel.find({});
    res.status(StatusCodes.OK).json({ accounts });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
    });
  }
};

export const getSingleAccount = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.params;

    const user = await UserModel.findOne({
      $or: [
        { accountNumber: identifier },
        { phoneNumber: identifier },
        { username: identifier },
        { email: identifier },
      ],
    });

    if (!user) {
      throw new NotFoundError(`User with ${identifier} not found`);
    }

    const userDetails = {
      id: user._id,
      username: user.username,
      accountNumber: user.accountNumber,
      email: user.email,
      phoneNumber: user.phoneNumber,
      accountBalance: user.accountBalance,
    };
    res.status(StatusCodes.OK).json({ user: userDetails });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    if (!userId) {
      throw new NotFoundError("User not found");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    Object.keys(updates).forEach((update) => {
      user.set(update, updates[update]);
    });

    const updatedUser = await user.save();
    res.status(StatusCodes.OK).json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError("User does not exist");
    }
    res.status(StatusCodes.OK).json({ msg: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
