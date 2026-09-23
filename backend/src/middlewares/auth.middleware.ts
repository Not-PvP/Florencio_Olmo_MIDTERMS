import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "../types";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  // TODO: read Authorization header, verify JWT, attach req.user, else 401
  next();
}
