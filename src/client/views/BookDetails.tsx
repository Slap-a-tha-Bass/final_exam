import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Books } from '../../../types';
import BookCard from '../components/BookCard';
import RootLayout from '../components/RootLayout';
import { apiService } from '../utils/api-service';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Books['id']>();
    useEffect(() => {
        apiService(`/api/books/${id}`)
            .then(data => setBook(data));
    }, []);

    return (
        <RootLayout>
            <BookCard key={id} {...book} isPreview />
        </RootLayout>
    )
}

export default BookDetails;
