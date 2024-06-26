import db from "../config/db.js";
import crypto from "crypto";
export const handleForgotPassword = (req, res) => {
  const { email } = req.body;
  const resetCode = crypto.randomBytes(3).toString("hex");

  handleUserExist(email)
    .then((data) => {
      console.log(data);
      checkAlreadySent(data.email, res)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({ status: "error", message: "user does not exist" });
    });
};

const handleUserExist = (email, res) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, data) => {
      if (err) {
        reject({ status: "ERROR", message: "Error querying the database" });
      } else {
        if (data.length === 0) {
          reject({ status: "ERROR", message: "User does not exist" });
        } else {
          resolve(data[0]);
        }
      }
    });
  });
};
const checkAlreadySent = (email, res) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM password_resets WHERE email = ?";
    db.query(query, [email], (err, data) => {
      if (err) {
        reject(err);
      } else {
        if (data.length === 0) {
          sendOtp(email, res);
        } else {
          resendOtp(email, res);
        }
      }
    });
  });
};

const sendOtp = (email, res) => {
  const resetCode = crypto.randomBytes(3).toString("hex");
  const query = "INSERT INTO password_resets (email, reset_code) VALUES (?, ?)";
  db.query(query, [email, resetCode], (err, result) => {
    if (err) throw err;
    return res.status(200).json({
      status: "success",
      message: "we have sent you the code at your email.",
      otp: resetCode,
    });
  });
};

const resendOtp = (email, res) => {
  const resetCode = crypto.randomBytes(3).toString("hex");
  const query = "UPDATE password_resets SET reset_code = ? WHERE email = ?";
  db.query(query, [resetCode, email], (err, data) => {
    if (err) {
      throw err;
    } else {
      res.json({
        status: "success",
        message: "We have sent you a code",
        otp: resetCode,
      });
    }
  });
};
