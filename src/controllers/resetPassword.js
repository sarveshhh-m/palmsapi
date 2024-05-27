import db from "../config/db.js";
import bcrypt from "bcrypt";

export const handleResetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  
  const query = "UPDATE users SET password = ? WHERE email = ?";
  db.query(query, [hashedPassword, email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(200).json({ message: "Password reset successful" });
  });
};
