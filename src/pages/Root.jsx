import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postApi } from '../api/api';

export default function Root() {
    const pageName = useLocation().pathname.slice(1) || 'main';
    const [isLogin, setIsLogin] = useState(false)

    useEffect(()=>{
        postApi('signIn/auth')
            .then(({result, isLogin, message})=>{
                if(result){
                    setIsLogin(isLogin);
                    console.log(message);
                }
            })
    },[])

    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="./css/import.css" />
            </Helmet>
            
            <ThemeContext.Provider value={{isLogin, setIsLogin}}>
                <Header />
                <section className={`${pageName}Page`}>
                    <Outlet />
                </section>
                <Footer />
            </ThemeContext.Provider>
        </>
    );
}

