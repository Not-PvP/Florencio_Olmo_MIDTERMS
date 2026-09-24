import { Router } from "express";
import authRoutes from "../authRoutes";
import incidentRoutes from "./service.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/service", incidentRoutes);

export default router;
