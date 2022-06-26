import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import { db } from "../../models";
import type {
  RegistrationFormType,
  UserTokenInfo,
} from "../../types/auth-types";
import { accountAcceptMailOpts, transporter } from "../Mailer";

config();

const generateAccessAccountToken: (opts: { id: string }) => string = ({
  id,
}) => {
  return jwt.sign({ id, createdAt: Date.now() }, process.env.SECRET_JWT, {
    expiresIn: "5m",
  });
};

export const registration = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password, username }: RegistrationFormType = req.body;

  if (!email || !password || !username)
    return res
      .status(403)
      .send({ error: "Seems like you forgot something...", status: 403 });

  const candidate = await db.user.findOne({ $or: [{ email }, { username }] });

  if (candidate) {
    return res.status(409).send({
      error: `User with this username (${username}) or email (${email}) already exist`,
      status: 409,
    });
  }

  const user = new db.user({
    email,
    password: bcrypt.hashSync(password, 7),
    username,
    roles: db.Roles.admin,
  });

  try {
    const newUser = await user.save();
    const token = generateAccessAccountToken({ id: newUser.id });
    await transporter.sendMail(
      accountAcceptMailOpts({ email, username, token })
    );
  } catch (e) {
    if (e instanceof Error) {
      return res.status(402).send({ error: e.message, status: 402 });
    }
  }

  res.status(200).send({
    message: "We are send you a message on your email. Check it out",
    status: 200,
  });
};

export const verify = async (req: express.Request, res: express.Response) => {
  const { token } = req.body;

  try {
    const userInfo = jwt.verify(token, process.env.SECRET_JWT);
    await db.user.updateOne(
      { id: (userInfo as UserTokenInfo).id },
      { verified: true }
    );

    res
      .status(200)
      .send({ message: "Your account now is verified", status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(403).json({
        redirect: "/",
        status: 403,
        message: e.message,
      });
    }
  }
};

export const reset = (req: express.Request, res: express.Response) => {
  const { email, username }: Omit<RegistrationFormType, "password"> = req.body;

  res.send({ message: "reset" });
};
