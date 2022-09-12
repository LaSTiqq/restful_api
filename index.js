import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", authRouter);

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection success");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => connection());
