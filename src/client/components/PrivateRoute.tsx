import React from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children, ...rest }: IPrivateRoute) => {
    const history = useHistory();
    const TOKEN = localStorage.getItem('token');

    if (!TOKEN) {
        Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: 'You need to be logged in to do that.',
            confirmButtonText: 'Login',
            showDenyButton: true,
            denyButtonText: 'Register'
        }).then(result => {
            if (result.isConfirmed) {
                history.push('/login');
            } else if (result.isDenied) {
                history.push('/register');
            }
        })
        return <Redirect to="/login" />
    } else {
        return <Route {...rest}>{children}</Route>
    }
}
interface IPrivateRoute {
    path: string,
    exact?: boolean,
    children: React.ReactNode
}
export default PrivateRoute;
