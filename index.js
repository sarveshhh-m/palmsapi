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
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

app.post("/create-new-password", (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  const query =
    "SELECT * FROM password_resets WHERE email = ? AND reset_code = ?";
  db.query(query, [email, resetCode], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid reset code" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query = "UPDATE users SET password = ? WHERE email = ?";
    db.query(query, [hashedPassword, email], (err, result) => {
      if (err) throw err;

      const query = "DELETE FROM password_resets WHERE email = ?";
      db.query(query, [email], (err, result) => {
        if (err) throw err;

        return res.status(200).json({ message: "Password reset successful" });
      });
    });
  });
});

app.get("/", async (req, res) => {
  const homePageData = fs.readFileSync("./src/index.html");
  const content = homePageData.toString();
  res.send(content);
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
