import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import creatorRoutes from "./routes/creatorRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/creators", creatorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
