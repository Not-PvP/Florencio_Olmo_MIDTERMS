import express from "express";
import { ServiceRoutes } from "./ServiceRoutes.js";
import dotenv from "dotenv";
import authRoutes from "./authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/it_service_requests", ServiceRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`IT Service Request API server running on http://localhost:${PORT}`);
});

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
}

