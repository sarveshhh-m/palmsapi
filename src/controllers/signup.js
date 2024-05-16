import db from "../config/db.js";
import bcrypt from "bcrypt";
export const handleSignup = (req, res) => {
  const { name, username, email, cellNumber, userType, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query =
    "INSERT INTO users (name, username, email, cell_number, user_type, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, username, email, cellNumber, userType, hashedPassword],
    (err, data) => {
      if (err) res.status(401).json({ status: "ERROR", message: err.message });
      else {
        res.status(201).json({
          status: "SUCCESS",
          message: "Account created successfully!",
        });
      }
    },
  );
};
