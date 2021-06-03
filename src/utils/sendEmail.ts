"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async(destiny, token) => {
    let testAccount = await nodemailer.createTestAccount();
  
   
    let transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: process.env.account, 
        pass: process.env.password, 
      },
    });
    const url=`http://localhost:${process.env.PORT}/confirmation/${token}`;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `Tindog <${process.env.account}>`,
      //Abraham Morales" <abraham301000@hotmail.com>', // sender address
      to: destiny, // list of receivers
      subject: "Verificación de correo", // Subject line
      html: `Click to confirm email: <a href="${url}">${url}</a>`
      //"<b>Tindog backend</b>", // html body
    }); 
    console.log("Message sent: %s", info.messageId);
}

module.exports = {
  sendEmail
}