import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, le server est ok!");
});

app.listen(SERVER_PORT, () => {
  console.info(`Server is running ${SERVER_PORT}`);
});
