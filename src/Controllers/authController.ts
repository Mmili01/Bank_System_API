import  { Request, Response } from 'express';


const register =async (_req:Request, res:Response) => {
    res.send('Register User')
}
const login =async (_req:Request, res:Response) => {
    res.send('login User')
}
const verifyEmail =async (_req:Request, res:Response) => {
    res.send('verify User')
}
const forgotPassword =async (_req:Request, res:Response) => {
    res.send('forgot password ')
}
const logout =async (_req:Request, res:Response) => {
    res.send('logout User')
}

module.exports= {
    register,
    login,
    verifyEmail,
    forgotPassword,
    logout
    
}