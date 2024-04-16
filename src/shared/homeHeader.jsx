import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


function HomeHeader() {
    return (
        <header className='bg-gradient-to-r from-deep-teal to-deep-teal via-teal-600 h-16'>
            <nav>
                <menu className='grid grid-cols-10'>
                    <Link className="text-tan font-serif text-2xl col-start-10 justify-self-center pl-3 border border-transparent hover:border-l-light-teal hover:border-l-4 hover:text-light-tan" to="/login">Login</Link>
                </menu>
            </nav>
        </header>
    );
};

export default HomeHeader;