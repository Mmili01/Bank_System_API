import { sendEmail } from "./sendEmail";
interface components {
    firstname: string
    email: string
    token: string
    origin: string
}

 const sendResetPasswordEmail = async ({firstname, email, token, origin}: components)=>{
    const resetURL:string = `${origin}/user/reset-password?token=${token}&email=${email}`
    const message:string = `<p>Please reset password by clicking on the following link: <a href = "${resetURL}">Reset Password</a></p>`

    return sendEmail(
     { to:email,
      subject:message,
      html:`<h4>Hello, ${firstname}</h4>  ${message}`}
    );

}
export default sendResetPasswordEmail
