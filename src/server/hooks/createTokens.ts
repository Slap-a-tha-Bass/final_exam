import * as jwt from 'jsonwebtoken';
import { ReqUsers } from '../../../types';
import { jwtConfig } from '../config';

export const createLoginToken = (req: ReqUsers, res: any) => {
    const token = jwt.sign({ userid: req.user.id, email: req.user.email, role: 'guest'},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expires});
            res.json(token);
            return;
}
export const createRegisterToken = (register: any, email: any, res: any) => {
    const token = jwt.sign({ userid: register.insertId, email, role: 'guest'},
            jwtConfig.secret,
            {expiresIn: jwtConfig.expires});
            res.json({ register, token });
            return;
}