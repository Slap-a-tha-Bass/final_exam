import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Books } from '../../../types';
import { apiService } from '../utils/api-service';

const BookCard = ({ title, author, price, id, categoryid, isPreview }: Books) => {
    const history = useHistory();
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(confirm(`Are you sure you want to delete?`)){
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
                    {isPreview && <Link className="btn btn-info btn-sm mx-3" to={`/edit/${id}`}>edit</Link>}
                    {isPreview && <button className="btn btn-info btn-sm mx-3" onClick={handleDelete}  >delete</button>}
                </div>
            </div>
        </div>
    )
}

export default BookCard;
