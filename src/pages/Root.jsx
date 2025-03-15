import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { postApi } from '../api/api';
import { styleIdx } from '../js/style';
// import '../css/import.module.css';

export default function Root() {
    // const pageName = useLocation().pathname.slice(1).split('/').filter((name) => !Number(name)) || ['main'];
    const location = useLocation();
    const pageName = useMemo(() => {
        const pageArr = location.pathname.slice(1);
        return pageArr ? pageArr.split('/').map((name) => !Number(name) ? name : 'detail') : ['main'];
    }, [location.pathname]);
    
    const [isLogin, setIsLogin] = useState(false)
    
    useEffect(()=>{
        postApi('signIn/auth')
            .then((response)=>{
                const {result, isLogin, message} = response || {};
                if(result){
                    console.log(result);
                    console.log(isLogin);
                    
                    console.log(message);
                    
                    setIsLogin(isLogin);
                }
            })

        // window.addEventListener('beforeunload', () => {
        //     postApi('logout')
        //         .then(( response )=>{
        //             const { result } = response || {};
        //             if(result){
        //                 setIsLogin(false)
        //             }
        //         })
        // });
    },[pageName])

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
                <section className={`${pageName.map((name) => `${name}Page`).join(' ') || 'mainPage'}`}>
                    <Outlet />
                </section>
                <Footer />
            </ThemeContext.Provider>
            
        </>
    );
}

