import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: parse req.body with schema, return 400 on failure, else call next()
    next();
  };
}
