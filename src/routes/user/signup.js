import { Router } from 'express';
import bcrypt from 'bcrypt';
import Queries from '../../constants/Queries.js';
import db from '../../config/db.js';

const signup = Router();

signup.post('/', async (req, res) => {
    const { name, username, email, phonenumber, usertype, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = db.execute(Queries.SIGNUP, [name, username, email, phonenumber, usertype, hashedPassword]);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default signup;
