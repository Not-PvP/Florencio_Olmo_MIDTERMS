import express from "express";
import { itServiceRequestsRoutes } from "./itServiceRequestsRoutes.js";
import dotenv from "dotenv";
import authRoutes from "./authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/it_service_requests", itServiceRequestsRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`IT Service Request API server running on http://localhost:${PORT}`);
});
