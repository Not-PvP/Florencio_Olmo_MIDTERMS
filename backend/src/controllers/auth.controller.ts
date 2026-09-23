import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  // TODO: verify credentials with bcrypt, sign JWT, return { token, user }
  res.status(501).json({ error: "Not implemented" });
}
