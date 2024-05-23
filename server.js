// importing the necessary libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors";

// mongodb connection file
import connectDB from "./config/db.js";

// calling the file paths
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import userAuth from './middlewares/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("api/v1/job", jobRoutes);

// vaidation middleware
app.use(errorMiddleware);
app.use(userAuth);

// const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT} in ${process.env.DEV_MODE}`);
});
