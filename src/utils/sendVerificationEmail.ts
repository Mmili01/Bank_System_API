import { sendEmail } from "./sendEmail";
interface sendVerificationEmailData{
    username:string
    email:string
    verificationToken:string
    origin:string

}
 const sendVerificationEmail = async({
    username,
    email,
    verificationToken,
    origin
}:sendVerificationEmailData) =>{
    const verifyEmail = `${origin}/api/v1/auth/verify-email?token=${verificationToken}&email=${email}`
    const message = `<p>Please click on the following link to verify your email: <a href="${verifyEmail}">Verify Email</a></p>`


    return sendEmail({
        to:email,
        subject:'Email Verification',
        html: `<h4>Hello ${username}</h4>
        ${message}`
    })
}

export default sendVerificationEmail