import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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
    return (
        <RootLayout>
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
                className="form-select">
                    <option value="0">Choose Genre</option>
                    {categories.map((values) => (
                        <option value={values.id} key={values.id}>
                            {values.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSubmit} className="btn btn-info">submit</button>
            </form>
        </RootLayout>
    )
}

export default Home;
