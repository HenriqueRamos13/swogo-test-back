import { Response } from "express";
import "dotenv/config";
export default class ErrorHandler {
    static Unauthorized(error: any, message: string, res?: Response): Response<any, Record<string, any>>;
}
