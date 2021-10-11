import * as express from 'express';
import {get_categories, get_one_category } from '../../db/queries/categories';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const categories = await get_categories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [category] = await get_one_category(Number(id));
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});


export default router;