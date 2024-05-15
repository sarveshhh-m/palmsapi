import { Router } from "express";
import db from '../../config/db.js';
import bcrypt from 'bcrypt';
import Queries from "../../constants/Queries.js";

const login = Router();

login.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        db.query(Queries.LOGIN, [email], async (err, result) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "No user found! Check your email" });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            res.status(200).json(user);
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default login;
