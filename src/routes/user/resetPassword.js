import { Router } from "express";
import { handleResetPassword } from "../../controllers/resetPassword.js";

export const resetPassword = Router();

resetPassword.post("/", handleResetPassword);
