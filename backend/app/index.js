import express, { json } from "express";
import termalCalcRouter from "./routes/termalCalc.router.js";

if (!process.env.NODE_ENV) {
  const dotenv = await import("dotenv");
  dotenv.config();
}

const PORT = process.env.PORT || 8080;

const app = express();

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(allowCrossDomain);

app.use(json());
app.use("/termalCalc", termalCalcRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
