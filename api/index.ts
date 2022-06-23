import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

import type { RegistrationFormType } from "./types/auth-types";

config();
const { API_PORT, DB_CONNECTION_STRING } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send({ message: "JU" });
});

app.post("/api/registration", (req: express.Request, res: express.Response) => {
  const { email, password, username }: RegistrationFormType = req.body;

  res.send({ message: "HI" });
});

app.post("/api/reset", (req: express.Request, res: express.Response) => {
  const { email, username }: Omit<RegistrationFormType, "password"> = req.body;

  res.send({ message: "reset" });
});

async function startApi() {
  try {
    await connect(DB_CONNECTION_STRING);
    console.log(`app connected to ${DB_CONNECTION_STRING}`);

    app.listen(API_PORT, () => {
      console.log(`Express server started at http://localhost:${API_PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

startApi();
