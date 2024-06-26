import React from "react";
import { Link } from "react-router-dom";
import './exampleNavbar.css';

function Navbar() {
    return (
        <div class="navbar">
            <Link to="/Register">Registration</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Products">Products</Link>
            <Link to="/UserDetails">Account Details</Link>
            <Link to="/Cart">Cart</Link>
        </div>
    )
}

export default Navbar;