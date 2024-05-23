import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { NumberSchemaDefinition } from "mongoose";
import { Interface } from "readline/promises";
import UserModel from "../models/User";

interface transferRequest{
    accountNumber:number 
    amount:number
}

export const transferAmount = async (req: Request<{}, {}, transferRequest>, res: Response) => {
   try {
    const {accountNumber, amount} = req.body;
    const senderId = req.user.userId

    const sender = await UserModel.findById(senderId)
   } catch (error) {
    
   } 
}