import { z } from "zod";

export const incidentBodySchema = z.object({
  title: z.string().min(3, "Title must at least be 3 characters."),
  description: z.string().min(5, "Description must at least be 5 characters."),
  severity: z
    .enum(["low", "medium", "high", "critical"])
    .optional()
    .default("low"),
  status: z
    .enum(["open", "in_progress", "resolved"])
    .optional()
    .default("open"),
});

// Create a wrapper schema for our generic Express middleware
export const createIncidentSchema = z.object({
  body: incidentBodySchema,
});

// PATCH only changes severity and/or status
export const updateIncidentSchema = z.object({
  body: incidentBodySchema.pick({ severity: true, status: true }).partial(),
  params: z.object({
    id: z.uuid("ID must be a valid UUID"),
  }),
});

// DELETE only needs a valid id (ids are UUIDs, so "123" would crash Postgres)
export const incidentIdSchema = z.object({
  params: z.object({
    id: z.uuid("ID must be a valid UUID"),
  }),
});

// Automatically infer TypeScript types from the Zod schemas
export type IncidentInput = z.infer<typeof incidentBodySchema>;

export const authBodySchema = z.object({
  email: z.email("A valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authRequestSchema = z.object({
  body: authBodySchema,
});

export type AuthInput = z.infer<typeof authBodySchema>;
