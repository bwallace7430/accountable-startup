import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';
import './header.css';

function Header() {

    const [user, setUser] = useState("");

    const location = useLocation();

    useEffect(() => {
        loadUser();
    }, [])

    async function loadUser() {
        let response = await fetch("/api/users/me");
        setUser((await response.json()).user);
    }

    function getNavBar() {
        return (<nav>
            <menu>
                <Link className="top_nav_item" to="/journal">Journal</Link>
                <Link className="top_nav_item" to="/friends">Friends</Link>
                <span className="spacer"></span>
                <span id="users_journal_tag">{user.username + "'s Journal"}</span>
                <Link className="top_nav_item log_out_button" to="/">Log Out</Link>
            </menu>
        </nav>);
    }

    return (
        <header>
            <img className="logo_img" src={logo} alt="Accountable logo" width="108" height="85" />
            <h2 className="logo_text">Accountable</h2>
            |
            {location.pathname === "/" ? "" : getNavBar()}
        </header>
    );
};

export default Header;