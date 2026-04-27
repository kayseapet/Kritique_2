import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="header-left">
                {/* Site Branding */}
                <Link to="/" className="site-logo">
                    <h1>Kritique</h1>
                </Link>
            </div>
            
            <div className="header-right">
                {/* The NavBar handles the menu button and sidebar */}
                <NavBar />
            </div>
        </header>
    );
};

export default Header;