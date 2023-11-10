import express from "express"
const router = express.Router()
import { register, login, logout, verifyEmail } from "../Controllers/authController"
import {authenticateUser} from '../middleware/authentication'

router.post('/register', register);
router.post('/login', login);
router.get('/logout',authenticateUser,logout)
router.get('/verify-email',verifyEmail)

export default router


