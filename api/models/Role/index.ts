import { Schema, model } from "mongoose";

export const Role = model(
  "Role",
  new Schema({
    name: String,
  })
);
