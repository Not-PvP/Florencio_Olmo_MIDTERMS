import { Router } from "express";
import authRoutes from "./auth.routes";
import incidentRoutes from "./incident.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/incidents", incidentRoutes);

export default router;
