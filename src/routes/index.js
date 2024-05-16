import express from "express";
import loginRouter from "./user/login.js";
import { signup } from "./user/signup.js";
import { forgotPassword } from "./user/forgotPassword.js";
import { resetPassword } from "./user/resetPassword.js";
import { verifyOtp } from "./user/verifyOtp.js";

const routes = express.Router();

// Use the loginRouter for handling requests to "/user/login"
routes.use("/user/login", loginRouter);
routes.use("/user/signup", signup);
routes.use("/user/forgot-password", forgotPassword);
routes.use("/user/reset-password", resetPassword);
routes.use("/user/verify-otp", verifyOtp);
export default routes;
