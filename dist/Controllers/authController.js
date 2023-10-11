"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register = async (_req, res) => {
    res.send('Register User');
};
const login = async (_req, res) => {
    res.send('login User');
};
const verifyEmail = async (_req, res) => {
    res.send('verify User');
};
const forgotPassword = async (_req, res) => {
    res.send('forgot password ');
};
const logout = async (_req, res) => {
    res.send('logout User');
};
module.exports = {
    register,
    login,
    verifyEmail,
    forgotPassword,
    logout
};
//# sourceMappingURL=authController.js.map