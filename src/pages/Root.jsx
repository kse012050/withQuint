import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postApi } from '../api/api';
import { styleIdx } from '../js/style';
// import '../css/import.module.css';

export default function Root() {
    const pageName = useLocation().pathname.slice(1).split('/')[0] || 'main';
    const [isLogin, setIsLogin] = useState(false)

    useEffect(()=>{
        postApi('signIn/auth')
            .then((response)=>{
                const {result, isLogin/* , message */} = response || {};
                if(result){
                    setIsLogin(isLogin);
                }
            })
    },[])

    useLayoutEffect(() => {
        return (
            document.querySelectorAll('[data-styleidx]').length ? styleIdx() : undefined
        )
    },[pageName])

    // useEffect(() => {
    //     const observer = new MutationObserver(() => {
    //         console.log('?');
    //         if (document.querySelectorAll('[data-styleidx]').length) {
    //             console.log('?');
                
    //             styleIdx();
    //         }
    //     });
    
    //     observer.observe(document.body, { childList: true, subtree: true });
        
    //     return () => observer.disconnect();
    // }, [pageName]);

    return (
        <>
            <ThemeContext.Provider value={{isLogin, setIsLogin}}>
                <Helmet>
                    <base href="/" />
                    <link rel="stylesheet" href="/css/import.css" />
                </Helmet>
                <Header />
                <section className={`${pageName}Page`}>
                    <Outlet />
                </section>
                <Footer />
            </ThemeContext.Provider>
            
        </>
    );
}

