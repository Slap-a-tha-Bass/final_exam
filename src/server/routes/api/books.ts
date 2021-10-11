import * as express from 'express';
import * as passport from 'passport';
import { get_books, get_one_book, edit_book, post_book, delete_book } from '../../db/queries/books';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const books = await get_books();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [book] = await get_one_book(Number(id));
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});
router.post('/', passport.authenticate('jwt'), async (req, res) => {
    const { title, author, price, categoryid } = req.body;
    const newBook = { title, author, price, categoryid };
    try {
        const postBook = await post_book(newBook);
        res.json({ message: "Book created!", id: postBook.insertId })
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});
router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    const { title, author, price, categoryid } = req.body;
    const editBook = { title, author, price, categoryid };
    try {
        await edit_book(editBook, Number(id));
        res.json({ message: "Book editted!"})
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});
router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
    const { id } = req.params;
    try {
        await delete_book(Number(id));
        res.json({ message: "Book deleted!"})
    } catch (error) {
        res.status(500).json({ message: "Error in router", error: error.sqlMessage });
    }
});

export default router;