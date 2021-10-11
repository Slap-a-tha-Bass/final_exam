import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { ReqUsers } from '../../../../types';
import { jwtConfig } from '../../config';
import { generateHash } from '../../utils/passwords';
import { insert_user } from '../../db/queries/users';
const router = express.Router();

router.post('/', async (req: ReqUsers, res) => {
    const { name, email, password} = req.body;
    try {
        const hashed = generateHash(password);
        const newUser = { name, email, password: hashed };
        const register = await insert_user(newUser);
        const token = jwt.sign({ userid: register.insertId, email, role: 'guest'},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expires});
        res.json({ register, token });
        return;
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;