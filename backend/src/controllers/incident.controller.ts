import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export async function createIncident(req: AuthRequest, res: Response) {
  // TODO: insert incident owned by req.user, return 201 + created incident
  res.status(501).json({ error: "Not implemented" });
}

export async function getIncidents(req: AuthRequest, res: Response) {
  // TODO: return all incidents (optionally scoped to req.user)
  res.status(501).json({ error: "Not implemented" });
}

export async function updateIncident(req: AuthRequest, res: Response) {
  // TODO: update status/severity for incident :id, return updated incident
  res.status(501).json({ error: "Not implemented" });
}

export async function deleteIncident(req: AuthRequest, res: Response) {
  // TODO: delete incident :id, return 204
  res.status(501).json({ error: "Not implemented" });
}
