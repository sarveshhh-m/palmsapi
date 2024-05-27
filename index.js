import express from "express";
import bcrypt from "bcrypt";
import db from "./src/config/db.js";
import crypto from "crypto";
import fs from "fs";
import routes from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use("/", routes);

db.connect((err) => {
  if (err) { console.log(err.message) }
  console.log("Connected to palmstownhall database!");
});
app.get("/", async (req, res) => {
  const homePageData = fs.readFileSync("./src/index.html");
  const content = homePageData.toString();
  res.send(content);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
