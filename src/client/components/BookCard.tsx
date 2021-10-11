import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Books } from '../../../types';
import { apiService } from '../utils/api-service';

const BookCard = ({ title, author, price, id, categoryid, isPreview }: Books) => {
    const history = useHistory();
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (Swal.fire({
            title: 'Deletion',
            icon: 'warning',
            text: `Are you sure you want to delete ${title} by ${author}?`,
            confirmButtonText: 'Yes I am sure!'
        })) {
            apiService(`/api/books/${id}`, 'DELETE', { title, author, price, categoryid })
                .then(data => {
                    history.push('/books');
                })
        } 
    }
    return (
        <div className="card border shadow rounded m-2 bg-light">
            <h1 className="card-title text-center text-info">{title}</h1>
            <div className="card-body">
                <h2 className="card-text text-center text-info">{author}</h2>
                <h4 className="card-text text-center text-info">{price}</h4>
                <div className="d-flex justify-content-center">
                    {isPreview && <Link className="btn btn-info btn-sm mx-3 border rounded-pill" to={`/edit/${id}`}>edit</Link>}
                    {isPreview && <button className="btn btn-info btn-sm mx-3 border rounded-pill" onClick={handleDelete}  >delete</button>}
                </div>
            </div>
        </div>
    )
}

export default BookCard;
