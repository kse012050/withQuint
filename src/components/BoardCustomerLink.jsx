import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Popup from './Popup';
import { postApi } from '../api/api';

export default function BoardCustomerLink({ id, children, password }) {
    const [popup, setPopup] = useState();
    const pathName = useLocation().pathname + (useLocation().pathname === '/customer' && '/vip');
    const postLink = pathName.split('/').filter((data) => !Number(data)).join('/')
    
    const onClick = (e) => {
        e.preventDefault();
        // postApi('boards/isIdentity', )
        setPopup({
            title: '안내',
            description: '비밀번호를 입력해주세요.',
            password: () => {
            }
        })
    }
    return (
        <>
            <Link to={`${postLink}${id ? `/${id}` : ''}`} className={password ? 'secret' : ''} onClick={password && onClick}>
                {children}
            </Link>
            { popup && 
                <Popup popup={popup} setPopup={setPopup}></Popup>
            }
        </>
    );
}

