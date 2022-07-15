import { Schema, model } from "mongoose";

export const User = model(
  "User",
  new Schema({
    username: {
      type: String,
      minlength: 2,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    surname: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: String,
        ref: "Role",
      },
    ],
  })
);
