import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
export const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.API_MAIL, // generated ethereal user
    pass: process.env.API_MAIL_PASS, // generated ethereal password
  },
});

const emailAcceptTemplate: (opts: {
  username: string;
  token: string;
}) => string = ({ username, token }) => `
  <h3>Hi ${username}</h3>
  <p>Thanks for using our app</p>
  <p>Here is a link for verify you to join us - <a href="http://127.0.0.1:3000/auth/verify?token=${token}">JOIN US</a></p>
`;

export const accountAcceptMailOpts: (opts: {
  email: string;
  username: string;
  token: string;
}) => nodemailer.SendMailOptions = ({ email, username, token }) => ({
  from: process.env.API_MAIL,
  to: email,
  subject: "Mail from bros. Account accept",
  html: emailAcceptTemplate({ username, token }),
});
