import { UnauthenticatedError } from "../errors/index";

import TokenModel from "../models/Token";

import { isTokenValid } from "../utils/jwt";

import { attachCookiesToResponse } from "../utils/jwt";

import { Request, Response, NextFunction } from "express";
// import UserModel from "../models/User";
// import { runInNewContext } from "vm";
// import { userInfo } from "os";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken, accessToken } = req.signedCookies;
  try {
    if (accessToken) {
      const payload: any = isTokenValid(accessToken);
      //@ts-expect-error
      req.user = payload.user;
      return next();
    }
    const payload: any = isTokenValid(refreshToken);
    const existingToken = await TokenModel.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError("Authentication Invalid");
    }
    //@ts-expect-error 
    req.user = payload.user;
    next();
    const tokenUser = {
        firstname: payload.user.firstName,
        lastName: payload.user.lastName,
        surname: payload.user.surname,
        id: payload.user._id,
        username: payload.user.username,
        phoneNumber: payload.user.phoneNumber,
        accountNumber: payload.user.accountNumber,
      };
    // attachCookiesToResponse(
    //   res,
    //   user: user,
    //   refreshToken: existingToken.refreshToken,
    // );
    attachCookiesToResponse( res,  tokenUser, refreshToken );
  } catch (error) {}
};


//import * as CustomAPIError from '