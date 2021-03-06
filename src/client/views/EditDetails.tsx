import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Categories } from '../../../types';
import RootLayout from '../components/RootLayout';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';
import Swal from 'sweetalert2';

const EditDetails = () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();

    const { values, handleChanges, populate } = useForm();

    const [categories, setCategories] = useState<Categories[]>([]);
    useEffect(() => {
        apiService('/api/categories')
            .then(values => setCategories(values));
    }, []);

    useEffect(() => {
        apiService(`/api/books/${id}`)
            .then(values => populate(values));
    }, []);

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (Swal.fire({
            title: 'Confirmation',
            icon: 'question',
            text: `Are you sure you want to edit ${values.title} by ${values.author}?`,
            confirmButtonText: 'Yes I am sure!',
            showDenyButton: true,
            denyButtonText: 'Actually, no'
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire('Saved!', '', 'success');
            } else if (result.isDenied){
                Swal.fire('Not saved', '', 'info');
            }
        })) {
            apiService(`/api/books/${id}`, 'PUT', { title: values.title, author: values.author, price: values.price, categoryid: values.categoryid })
                .then(data => {
                    history.push('/books')
                })
        }
    }
    return (
        <RootLayout>
            <h1 className="text-info text-center bg-light border border-info rounded-pill col-md-4 p-2 mt-3">edit</h1>
            <form className="form-group p-2">
                <label htmlFor="" className="text-info">title</label>
                <input
                    name="title"
                    value={values.title || ''}
                    onChange={handleChanges}
                    type="text"
                    className="form-control" />
                <label htmlFor="" className="text-info">author</label>
                <input
                    name="author"
                    value={values.author || ''}
                    onChange={handleChanges}
                    type="text"
                    className="form-control" />
                <label htmlFor="" className="text-info">price</label>
                <input
                    name="price"
                    value={values.price || ''}
                    onChange={handleChanges}
                    type="number"
                    step='.01'
                    className="form-control" />
                <select
                    name="categoryid"
                    value={values.categoryid}
                    onChange={handleChanges}
                    className="form-select mt-2">
                    <option value="0">Choose Genre</option>
                    {categories.map((values) => (
                        <option value={values.id} key={values.id}>
                            {values.name}
                        </option>
                    ))}
                </select>
                <div className="d-flex justify-content-center mt-2">
                    <Link to={`/books/${id}`} className="btn btn-danger mx-3 border rounded-pill">cancel</Link>
                    <button onClick={handleEdit} className="btn btn-info mx-3 border rounded-pill">confirm</button>
                </div>
            </form>
        </RootLayout>
    )
}

export default EditDetails;
