import express from "express";

const PORT = 3007;
const app = express();

app.get("/api", (req: express.Request, res: express.Response) => {
  res.send({ message: "hy" });
});

app.listen(PORT, () => {
  console.log(`Express server started at http://localhost:${PORT}`);
});
