import React, { useEffect } from 'react';
import Header from '../../components/admin/Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getApi } from '../../api/api';

export default function Root() {
    const location = useLocation();
    const pathName = location.pathname.split('/').slice(2);
    const navigate = useNavigate();

    useEffect(()=>{
        getApi('admin/auth')
            .then(({result, state} = {})=>{
                if(!result || !state){
                    navigate('/admin')
                }
            })
    },[navigate])
    
    return (
        <div className='adminPage'>
            <link rel="stylesheet" href="/css/admin/import.css" />
            <Header />
            <section className={pathName.map((name) => `${name}Page`).join(' ')}>
                <Outlet />
            </section>
        </div>
    );
}

