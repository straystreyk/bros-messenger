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
  <p>Here is a link for verify you to join us - <a href="${process.env.APP_HOST}/verify?token=${token}">JOIN US!!</a></p>
  <p>Or if u can't click on the button take the link and paste it in the browser ${process.env.APP_HOST}/verify?token=${token}</p>
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

const resetPasswordTemplate: (opts: {
  username: string;
  id: string;
}) => string = ({ username, id }) => `
  <h3>Here we go again..... Hello ${username}</h3>
  <p>Here is a link for reset your password - <a href="${process.env.APP_HOST}/reset/user?id=${id}">JOIN US!!</a></p>
  <p>Or if u can't click on the button take the link and paste it in the browser ${process.env.APP_HOST}/reset/user?id=${id}</p>
`;

export const resetPasswordMailOpts: (opts: {
  email: string;
  username: string;
  id: string;
}) => nodemailer.SendMailOptions = ({ email, username, id }) => ({
  from: process.env.API_MAIL,
  to: email,
  subject: "Mail from bros. Reset password",
  html: resetPasswordTemplate({ username, id }),
});
