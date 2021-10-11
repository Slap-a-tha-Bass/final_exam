import React from 'react';
import { useHistory } from 'react-router';
import RootLayout from '../components/RootLayout';
import { useForm } from '../hooks/useForm';
import { apiService } from '../utils/api-service';

const Login = () => {
    const history = useHistory();
    const { values, handleChanges } = useForm();
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        apiService('/auth/login', 'POST', { email: values.email, password: values.password, role: 'guest' })
            .then(token => {
                localStorage.setItem('token', token),
                    history.push('/profile')
            })
    }
    let disabledBtn = true;
    if (values.email && values.password) {
        disabledBtn = false;
    }
    return (
        <RootLayout>
            <h1 className="text-info text-center bg-light border border-info rounded-pill col-md-4 p-2 mt-3">login</h1>
            <form className="form-group p-2">
                <label htmlFor="" className="text-info">email</label>
                <input
                    name="email"
                    value={values.email || ''}
                    onChange={handleChanges}
                    type="email"
                    className="form-control" />
                <label htmlFor="" className="text-info">password</label>
                <input
                    name="password"
                    value={values.password || ''}
                    onChange={handleChanges}
                    type="password"
                    className="form-control" />
                <button onClick={handleLogin} disabled={disabledBtn} className="btn btn-info border rounded-pill mt-2">login</button>
            </form>
        </RootLayout>
    )
}

export default Login;
