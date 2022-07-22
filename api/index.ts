import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import {
  login,
  registration,
  reset,
  reset_password,
  verify,
} from "./controllers/Authentication";

config();
const { API_PORT, API_IP, DB_CONNECTION_STRING } = process.env;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Check api
app.get("/api", (req: express.Request, res: express.Response) => {
  res.send({ message: "Hello form Node api :_)" });
});

// Authentication
app.post("/api/registration", registration);
app.post("/api/verify", verify);
app.post("/api/reset", reset);
app.post("/api/reset_password", reset_password);
app.post("/api/login", login);

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
