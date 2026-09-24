import { Router } from "express";
import authRoutes from "./auth.routes";
import incidentRoutes from "./service.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/service", incidentRoutes);

export default router;
