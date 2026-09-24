import { z } from "zod";

export const resourceBodySchema = z.object({
    requester_name: z.string().min(1, "This field is required."),
    title: z.string().min(1, "This field is required."),
    description: z.string().min(1, "This field is required."),
    priority: z.enum(["low", "medium", "high"]),
    status: z.enum(["open", "in_progress", "resolved"]),
});

export const createItServiceRequestsSchema = z.object({
  body: resourceBodySchema,
});

export const updateItServiceRequestsSchema = z.object({
  body: resourceBodySchema.partial(),
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
  }),
});

export const idSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string"),
  }),
});

export const authBodySchema = z.object({
  username: z.string().min(3, "Username must at least be 3 characters"),
  password: z.string().min(6, "Password must at least be 6 characters"),
});

export const authRequestSchema = z.object({
  body: authBodySchema,
});
