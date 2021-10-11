import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { ReqUsers } from '../../../../types';
import { jwtConfig } from '../../config';
import { generateHash } from '../../utils/passwords';
import { insert_user } from '../../db/queries/users';
import { createRegisterToken } from '../../hooks/createTokens';
const router = express.Router();

router.post('/', async (req: ReqUsers, res) => {
    const { name, email, password} = req.body;
    try {
        const hashed = generateHash(password);
        const newUser = { name, email, password: hashed };
        const register = await insert_user(newUser);
        createRegisterToken(register, email, res);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;