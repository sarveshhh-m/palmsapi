import { Router } from "express";
import { handleSignup } from "../../controllers/signup.js";

export const signup = Router();

signup.post("/", handleSignup);
