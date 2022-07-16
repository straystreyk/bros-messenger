import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { connect } from "mongoose";
import {
  registration,
  reset,
  reset_password,
  verify,
} from "./controllers/Authentification";

config();
const { API_PORT, API_IP, DB_CONNECTION_STRING } = process.env;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send({ message: "Hello form Node api :_)" });
});

// Authentification
app.post("/api/registration", registration);
app.post("/api/verify", verify);
app.post("/api/reset", reset);
app.post("/api/reset_password", reset_password);

async function startApi() {
  try {
    await connect(DB_CONNECTION_STRING);
    console.log(`app connected to ${DB_CONNECTION_STRING}`);

    app.listen(+API_PORT, API_IP, () => {
      console.log(`Express server started at ${API_PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
}

startApi();
