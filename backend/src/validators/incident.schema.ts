import { z } from "zod";

export const createServiceSchema = z.object({
  // TODO: define validated create-incident fields
  name: z.string().min(3).max(60),
  endpointUrl: z.string(),
  environment: z.enum(["DEVELOPMENT", "STAGING", "PRODUCTION"]),
  status: z.enum(["HEALTHY", "DEGRADED", "DOWN"]),
  version: z.string()
});

export const updateServiceSchema = z.object({
  // TODO: define validated update-incident fields (status/severity)
  name: z.string().min(3).max(60).optional(),
  endpointUrl: z.string().optional(),
  environment: z.enum(["DEVELOPMENT", "STAGING", "PRODUCTION"]).optional(),
  status: z.enum(["HEALTHY", "DEGRADED", "DOWN"]).optional(),
  version: z.string().optional()
});

export const deleteServiceSchema = z.object({
  id: z.string(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type DeleteServiceInput = z.infer<typeof deleteServiceSchema>;
