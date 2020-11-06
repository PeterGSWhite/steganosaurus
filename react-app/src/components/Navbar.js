import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="nav-wrapper red darken-3">
            <div className="container">
                <a href="/" className="brand-logo">Steganosaurus</a>
                <ul className="right">
                    <li><NavLink to="/encode">Encode</NavLink></li>
                    <li><NavLink to="/decode">Decode</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar