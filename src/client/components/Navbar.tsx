import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <Link className="btn btn-outline-info mx-3" to="/">home</Link>
            <Link className="btn btn-outline-info mx-3" to="/books">books</Link>
            <Link className="btn btn-outline-info mx-3" to="/login">login</Link>
            <Link className="btn btn-outline-info mx-3" to="/register">register</Link>
        </div>
    )
}

export default Navbar;
