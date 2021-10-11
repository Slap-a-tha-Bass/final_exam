import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Books } from '../../../types';
import BookCard from '../components/BookCard';
import RootLayout from '../components/RootLayout';
import { apiService } from '../utils/api-service';

const Books = () => {
    const [books, setBooks] = useState<Books[]>([]);
    useEffect(() => {
        apiService('/api/books')
            .then(data => setBooks(data));
    }, []);

    return (
        <RootLayout>
            {books.map((book) => (
                <Link className="text-decoration-none" to={`/books/${book.id}`} key={book.id}>
                    <BookCard {...book} />
                </Link>
            ))}
        </RootLayout>
    )
}

export default Books;
