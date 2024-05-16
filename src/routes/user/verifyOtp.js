import { Router } from "express";
import { handleVerifyOtp } from "../../controllers/verifyOtp.js";
export const verifyOtp = Router();

verifyOtp.post("/", handleVerifyOtp);
