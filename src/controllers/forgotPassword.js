import db from "../config/db.js";
import Queries from "../constants/Queries.js";

export const addToOtpTable = (email, callback) => {
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const otp = randomInteger(111111, 999999);
    console.log(otp);
    db.query(Queries.SEND_OTP, [email, otp], (err, result) => {
        if (err) {
            console.error(err.message);
            callback({ success: false, message: "Failed to send OTP" });
        } else {
            callback({ success: true, message: "OTP sent successfully", otp: otp });
        }
    });
};
