import db from "../config/db.js";
import bcrypt from "bcrypt";
export const handleLogin = (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(401).json({
        status: "ERROR",
        message: "Email does not exist",
      });
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        return res.status(200).json({
          status: "SUCCESS",
          message: "Login successful",
          data: user,
        });
      } else {
        return res.status(401).json({
          status: "ERROR",
          message: "Invalid password! try again",
        });
      }
    });
  });
};
