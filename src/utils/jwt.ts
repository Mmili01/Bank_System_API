import Jwt from "jsonwebtoken";
import {  Response } from "express";

export const createJWT = ({ payload }: { payload: object | string }) => {
  const token = Jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
}

export const isTokenValid = (token: string) => {
  try {
    Jwt.verify(token, process.env.JWT_SECRET as string);
    
  } catch (error) {
    console.log(error);
    
  }
}

export const attachCookiesToResponse = (res: Response, user: object, refreshToken: string) => {
  const accessTokenJWT = createJWT({ payload: user });
  const refreshTokenJWT = createJWT({ payload: { ...user, refreshToken } });

  const oneDay: number = 1000 * 60 * 60 * 24;
  const oneMonth: number = 1000 * 60 * 60 * 24 * 30;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneMonth),
  });
};
