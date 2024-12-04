import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Root() {
    const pageName = useLocation().pathname.slice(1) || 'main';
    
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="./css/import.css" />
            </Helmet>
            <Header />
            <section className={`${pageName}Page`}>
                <Outlet />
            </section>
            <Footer />
        </>
    );
}

