import { z } from "zod";

export const createIncidentSchema = z.object({
  // TODO: define validated create-incident fields
  title: z.string().min(1),
  description: z.string().min(1),
  severity: z.enum(["low", "medium", "high", "critical"]),
});

export const updateIncidentSchema = z.object({
  // TODO: define validated update-incident fields (status/severity)
  status: z.enum(["open", "in_progress", "resolved"]).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
});

export type CreateIncidentInput = z.infer<typeof createIncidentSchema>;
export type UpdateIncidentInput = z.infer<typeof updateIncidentSchema>;
