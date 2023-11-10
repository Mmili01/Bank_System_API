import * as nodemailer from 'nodemailer';

import nodemailerConfig from './nodemailerConfig'
interface sendEmailData{
    to: string
    subject: string
    html:string
}

export const sendEmail = async ({to,subject,html}:sendEmailData)=>{
    // let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport(nodemailerConfig)

   async function main() {
    try {
        const info = await transporter.sendMail({
            from: '"craves Republic" <cravesrepublic@gmail.com>',//sender address
            to,
            subject,
            html,
        })
        console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
    } catch (error) {
        console.log(error);
        
    }
    
   }
   await main()
}
