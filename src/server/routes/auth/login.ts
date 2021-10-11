import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { ReqUsers } from '../../../../types';
import { jwtConfig } from '../../config';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: ReqUsers, res) => {
    try {
        const token = jwt.sign({ userid: req.user.id, email: req.user.email, role: 'guest'},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expires});
        res.json(token);
        return;
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;