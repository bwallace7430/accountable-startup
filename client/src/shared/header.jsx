import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';
import './header.css';

function Header() {

    return (
        <header>
            <img className="logo_img" src={logo} alt="Accountable logo" width="108" height="85" />
            <h2 className="logo_text">Accountable</h2>
            |
            <nav>
                <menu>
                    <Link className="top_nav_item" to="/journal">Journal</Link>
                    <Link className="top_nav_item" to="/friends">Friends</Link>
                    <span className="spacer"></span>
                    <span id="users_journal_tag"></span>
                    <Link className="top_nav_item log_out_button" to="/">Log Out</Link>
                </menu>
            </nav>
        </header>
    );
};

export default Header;