import { z } from "zod";

export const loginSchema = z.object({
email: z.string().email(),
password: z.string().min(6),
});

export const createServiceSchema = z.object({
  name: z.string().min(3).max(60),
  endpointUrl: z.string(),
  environment: z.enum(["DEVELOPMENT", "STAGING", "PRODUCTION"]),
  status: z.enum(["HEALTHY", "DEGRADED", "DOWN"]),
  version: z.string()
});

export const updateServiceSchema = z.object({
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
