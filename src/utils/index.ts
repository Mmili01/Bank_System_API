import { createJWT, isTokenValid, attachCookiesToResponse } from './jwt';
import createTokenUser from './createTokenUser';
import checkPermissions from './checkPermissions';
import sendVerificationEmail from './sendVerificationEmail';
import sendResetPasswordEmail from './sendResetPassword';
import createHash from './createHash';


export default{
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser,
    checkPermissions,
    sendVerificationEmail,
    sendResetPasswordEmail,
    createHash
}