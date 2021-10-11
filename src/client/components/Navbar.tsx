import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="d-flex justify-content-center mb-2">
            <NavLink className="btn btn-outline-info mx-3 border rounded-pill" exact to="/">home</NavLink>
            <NavLink className="btn btn-outline-info mx-3 border rounded-pill" exact to="/books">books</NavLink>
            <NavLink className="btn btn-outline-info mx-3 border rounded-pill" exact to="/login">login</NavLink>
            <NavLink className="btn btn-outline-info mx-3 border rounded-pill" exact to="/register">register</NavLink>
        </div>
    )
}

export default Navbar;
