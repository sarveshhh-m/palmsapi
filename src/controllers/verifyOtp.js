import db from "../config/db.js";

export const handleVerifyOtp = (req, res) => {
  const { email, code } = req.body;

  // Query to check if reset code is valid for the given email
  const query =
    "SELECT * FROM password_resets WHERE email = ? AND reset_code = ?";
  db.query(query, [email, code], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  });
};
