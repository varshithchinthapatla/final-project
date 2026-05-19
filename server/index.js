import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import explainRoutes from "./routes/explain.js";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message:
      "Explain Like Friend AI Backend Running Successfully",
  });
});

/* ROUTES */
app.use("/api/auth", authRoutes);

app.use("/api/explain", explainRoutes);

app.use("/api/chat", chatRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server Running");
    });
  })
  .catch((err) => {
    console.log(
      "MongoDB Error:",
      err.message
    );
  });