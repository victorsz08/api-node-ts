import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { HttpStatus } from "../package/http-exceptions/http-status";

export type T = any;
export type RequestSource = "body" | "params" | "query";

export function ValidateData(
  schema: z.ZodObject<T, T>,
  source: RequestSource = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validateToData = req[source];
      schema.parse(validateToData);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          issue: `${issue.path.join(".")}`,
          message: `${issue.message}`,
        }));

        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            error: "campos preenchidos incorretamente",
            details: errorMessages,
          });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
}
