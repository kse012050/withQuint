import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postApi } from '../api/api';
import { styleIdx } from '../js/style';
import SubTitle from '../components/SubTitle';
// import '../css/import.module.css';

export default function Root() {
    const location = useLocation();
    const pageName = useMemo(() => {
        const pageArr = location.pathname.slice(1);
        return pageArr ? pageArr.split('/').map((name) => !Number(name) ? name : 'detail') : ['main'];
    }, [location.pathname]);
    
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")))
    
    // useEffect(()=>{
    //     if(user) return;
    //     postApi('signIn/auth')
    //         .then((response)=>{
    //             const {result, /* message, */ user} = response || {};
    //             if(result){
    //                 setUser(user)
    //             }
    //         })
    // },[user])

    useLayoutEffect(() => {
        return (
            document.querySelectorAll('[data-styleidx]').length ? styleIdx() : undefined
        )
    },[pageName])

    return (
        <>
            <ThemeContext.Provider value={{ user, setUser }}>
                <link rel="stylesheet" href="/css/import.css" />
                <Helmet>
                    <base href="/" />
                </Helmet>
                <Header />
                <section className={`${pageName.map((name) => `${name}Page`).join(' ') || 'mainPage'}`}>
                    <SubTitle />
                    <Outlet />
                </section>
                <Footer />
            </ThemeContext.Provider>
            
        </>
    );
}

