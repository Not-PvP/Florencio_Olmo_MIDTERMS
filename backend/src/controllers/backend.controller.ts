import { Response } from "express";
import { requireAuth } from "../middlewares/auth.middleware";

export async function createService(req: requireAuth, res: Response) {
  // TODO: insert incident owned by req.user, return 201 + created incident
  res.status(501).json({ error: "Not implemented" });
}

export async function getService(req: AuthRequest, res: Response) {
  // TODO: return all incidents (optionally scoped to req.user)
  res.status(501).json({ error: "Not implemented" });
}

export async function updateService(req: AuthRequest, res: Response) {
  // TODO: update status/severity for incident :id, return updated incident
  res.status(501).json({ error: "Not implemented" });
}

export async function deleteService(req: AuthRequest, res: Response) {
  // TODO: delete incident :id, return 204
  res.status(501).json({ error: "Not implemented" });
}
