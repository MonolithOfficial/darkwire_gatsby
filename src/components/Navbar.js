import React from 'react';
import { Link } from "gatsby"


const Navbar = () => {
    return (
        <nav id="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to="/lists">Lists</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;