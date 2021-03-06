import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import { db } from "../../models";
import type {
  RegistrationFormType,
  UserTokenInfo,
} from "../../types/auth-types";
import {
  accountAcceptMailOpts,
  resetPasswordMailOpts,
  transporter,
} from "../Mailer";

config();

const generateAccessAccountToken: (opts: {
  id: string;
  expiresIn: string;
  [p: string]: string | unknown[] | number;
}) => string = ({ id, expiresIn, ...rest }) => {
  return jwt.sign(
    { id, ...rest, createdAt: Date.now() },
    process.env.SECRET_JWT,
    {
      expiresIn,
    }
  );
};

export const registration = async (
  req: express.Request,
  res: express.Response
) => {
  const { email, password, username, name, surname }: RegistrationFormType =
    req.body;

  if (!email || !password || !username)
    return res
      .status(403)
      .send({ message: "Seems like you forgot something...", status: 403 });

  const candidate = await db.user.findOne({ $or: [{ email }, { username }] });

  if (candidate) {
    return res.status(409).send({
      message: `User with username: "${username}" or email: "${email}" is already exist`,
      status: 409,
    });
  }

  const user = new db.user({
    email,
    password: bcrypt.hashSync(password, 7),
    username,
    name,
    surname,
    roles: [db.Roles.admin],
  });

  try {
    const newUser = await user.save();
    const token = generateAccessAccountToken({
      id: newUser.id,
      expiresIn: "5m",
    });
    await transporter.sendMail(
      accountAcceptMailOpts({ email, username, token })
    );

    return res.status(200).send({
      message: "We are send you a message on your email. Check it out",
      status: 200,
    });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(402).send({ message: e.message, status: 402 });
    }
  }
};

export const verify = async (req: express.Request, res: express.Response) => {
  const { token } = req.body;

  try {
    const userInfo = jwt.verify(token, process.env.SECRET_JWT);
    await db.user.updateOne(
      { _id: (userInfo as UserTokenInfo).id },
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

export const reset = async (req: express.Request, res: express.Response) => {
  const { email }: Omit<RegistrationFormType, "password"> = req.body;

  if (!email)
    return res
      .status(403)
      .send({ message: "Seems like you forgot something...", status: 403 });

  const candidate = await db.user.findOne({ email });

  if (!candidate)
    return res.send({
      message: `We can't find the user with email: "${email}"`,
      status: 404,
    });

  const { id, username } = candidate;

  try {
    await transporter.sendMail(resetPasswordMailOpts({ email, username, id }));
  } catch (e) {
    if (e instanceof Error) {
      return res.status(402).send({ message: e.message, status: 402 });
    }
  }

  res.send({
    message:
      "We have sent you instructions on how to reset your password to your email.",
    status: 200,
  });
};

export const reset_password = async (
  req: express.Request,
  res: express.Response
) => {
  const { id, password }: { id: string; password: string } = req.body;

  if (!id || !password)
    return res
      .status(403)
      .send({ message: "Seems like you forgot something...", status: 403 });

  try {
    await db.user.updateOne(
      { _id: id },
      { password: bcrypt.hashSync(password, 7) }
    );

    return res.send({
      message: "We changed your password. Go back to login page and enjoy :)",
      status: 200,
    });
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

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;
    const candidate = await db.user.findOne({
      $or: [{ email: username }, { username }],
    });

    if (!candidate) {
      return res
        .status(400)
        .send({ message: `User ${username} didn't find`, status: 403 });
    }
    const valid_password = bcrypt.compareSync(password, candidate.password);

    if (!valid_password) {
      return res
        .status(403)
        .send({ message: `Incorrect username or password`, status: 403 });
    }
    const token = generateAccessAccountToken({
      id: candidate.id,
      roles: candidate.roles,
      username: candidate.username,
      expiresIn: "5000h",
    });
    return res.status(200).send({ token, status: 200 });
  } catch (e) {
    return res.status(500).send({ message: e.message, status: 500 });
  }
};

// export const verifyAuthToken = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const { token } = req.body;
//   const userInfo = jwt.verify(token, process.env.SECRET_JWT);
//
//   if (userInfo) {
//     return res.status(200).send({ message: "ok", status: 200 });
//   }
//
//   return res.status(500).send({ message: "token is not valid", status: 500 });
// };
