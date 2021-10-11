import React from 'react';
import { Redirect, Route } from 'react-router';
import Swal from 'sweetalert2';

const PrivateRoute = ({children, ...rest}: IPrivateRoute) => {

   const TOKEN = localStorage.getItem('token');

   if (!TOKEN) {
       Swal.fire({
           title: 'Error!',
           icon: 'error',
           text: 'You need to be logged in to do that.',
           timer: 2000
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
