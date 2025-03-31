import React from 'react';
import Header from '../../components/admin/Header';
import { Outlet, useLocation } from 'react-router-dom';

export default function Root() {
    const location = useLocation();
    const pathName = location.pathname;
    console.log(pathName);
    
    return (
        <div className='adminPage'>
            <link rel="stylesheet" href="/css/admin/import.css" />
            <Outlet />
            <Header />
            <section>

            </section>
        </div>
    );
}

