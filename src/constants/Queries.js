export default {
    LOGIN: "SELECT * FROM users WHERE email=?",
    SIGNUP: "INSERT INTO users (name,username,email,phonenumber,usertype,password) VALUES (?,?,?,?,?,?)",
    IF_EMAIL_EXIST: "SELECT * FROM users WHERE email =?",
    SEND_OTP: "INSERT INTO OTP (email,OTP) VALUES(?,?)",
    VERIFY_OTP: "SELECT * FROM OTP WHERE (email,OTP) = (? ,?)",
    UPDATE_PASSWORD: "UPDATE users SET password=? WHERE email=?"

}