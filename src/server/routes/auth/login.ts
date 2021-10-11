import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { ReqUsers } from '../../../../types';
import { jwtConfig } from '../../config';
import { createLoginToken } from '../../hooks/createTokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: ReqUsers, res) => {
    try {
        createLoginToken(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;