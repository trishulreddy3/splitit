import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(helmet());
app.use(cors({
  origin: [process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:8081", "https://fareplay.netlify.app"],
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

import apiRoutes from "./routes";
import { errorHandler, notFound } from "./middlewares/error.middleware";

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Splitit API is running" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
