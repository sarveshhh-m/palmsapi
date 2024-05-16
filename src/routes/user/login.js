import { Router } from "express";
import { handleLogin } from "../../controllers/login.js";

const login = Router();

login.get("/", (req, res) => {
  res.send("Hello there! This is the login route.");
});
login.post("/", handleLogin);

export default login;
