import * as express from 'express';
import * as passport from 'passport';
import booksRouter from './books';
import categoriesRouter from './categories';
import usersRouter from './users';

const router = express.Router();

router.use('/books', booksRouter);
router.use('/categories', passport.authenticate('jwt'), categoriesRouter);
router.use('/users', passport.authenticate('jwt'), usersRouter);

export default router;