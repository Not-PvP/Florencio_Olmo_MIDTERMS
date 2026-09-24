import { Router } from "express";
import {
  createService,
  deleteService,
  getService,
  updateService,
} from "../controllers/incident.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createServiceSchema, updateServiceSchema } from "../validators/incident.schema";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createServiceSchema), createService);
router.get("/", getService);
router.patch("/:id", validate(updateServiceSchema), updateService);
router.delete("/:id", deleteService);

export default router;
