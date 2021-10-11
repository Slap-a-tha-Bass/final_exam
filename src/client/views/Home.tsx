import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Categories } from '../../../types';
import RootLayout from '../components/RootLayout';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const Home = () => {
    const history = useHistory();
    const { values, handleChanges } = useForm();
    const [categories, setCategories] = useState<Categories[]>([]);
    useEffect(() => {
        apiService('/api/categories')
            .then(values => setCategories(values));
    }, []);
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/api/books', 'POST', { title: values.title, author: values.author, price: values.price, categoryid: values.categoryid })
            .then(data => {
                history.push('/books')
            })
    }
    let disabledBtn = true;
    if (values.title && values.author && values.price && values.categoryid) {
        disabledBtn = false;
    }

    return (
        <RootLayout>
            <h1 className="text-info text-center bg-light border border-info rounded-pill col-md-4 p-2 mt-3">home</h1>
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
                <div className="d-flex justify-content-center">
                    <button onClick={handleSubmit} disabled={disabledBtn} className="btn btn-info mt-2 border rounded-pill mx-3">submit</button>
                    <Link className="btn btn-info mt-2 border rounded-pill mx-3" to="/profile">profile</Link>
                </div>
            </form>
        </RootLayout>
    )
}

export default Home;
