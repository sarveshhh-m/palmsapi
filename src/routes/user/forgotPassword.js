import { Router } from "express";
import { handleForgotPassword } from "../../controllers/forgotPassword.js";

export const forgotPassword = Router();

forgotPassword.post("/", handleForgotPassword);
