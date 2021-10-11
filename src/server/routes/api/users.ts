import * as express from 'express';
import { ReqUsers } from '../../../../types';

const router = express.Router();

router.get('/', async (req: ReqUsers, res) => {
    try {
        res.json(`Welcome, ${req.user.email}!`);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;