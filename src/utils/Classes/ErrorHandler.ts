import { Response } from "express";
import "dotenv/config";

export default class ErrorHandler {
  public static Unauthorized(error: any, message: string, res?: Response) {
    process.env.LOG_REAL_ERRORS && console.log(error);

    if (res)
      return res.status(401).json({
        message: message,
        ...(process.env.LOG_REAL_ERRORS === "true" && { error: error }),
      });

    throw new Error(message);
  }
}
