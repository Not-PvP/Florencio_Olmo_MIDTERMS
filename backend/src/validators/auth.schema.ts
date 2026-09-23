import { z } from "zod";

export const loginSchema = z.object({
  // TODO: define validated login fields
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
