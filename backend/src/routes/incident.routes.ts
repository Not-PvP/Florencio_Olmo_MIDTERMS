import { Router } from "express";
import {
  createIncident,
  deleteIncident,
  getIncidents,
  updateIncident,
} from "../controllers/incident.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createIncidentSchema, updateIncidentSchema } from "../validators/incident.schema";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createIncidentSchema), createIncident);
router.get("/", getIncidents);
router.patch("/:id", validate(updateIncidentSchema), updateIncident);
router.delete("/:id", deleteIncident);

export default router;
