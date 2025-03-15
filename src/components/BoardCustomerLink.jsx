import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Popup from './Popup';
import { postApi } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';

export default function BoardCustomerLink({ data, children }) {
    const { isLogin, user } = useContext(ThemeContext);
    const [popup, setPopup] = useState();
    const pathName = useLocation().pathname + (useLocation().pathname === '/customer' && '/vip');
    const postLink = pathName.split('/').filter((data) => !Number(data)).join('/')
    const id = data.id;
    const isSecret = data.secret === 'y';
    const isAuthor = data.author === user?.userId;

    console.log(user);
    

    const onClick = (e) => {
        e.preventDefault();
        // postApi('boards/isIdentity', )
        setPopup({
            type: 'lock'
        })
    }
    return (
        <>
            <Link 
                to={`${postLink}${id ? `/${id}` : ''}`}
                className={isSecret ? 'secret' : ''}
                onClick={isSecret && !isAuthor && onClick}
            >
                {children}
            </Link>
            { popup && 
                <Popup popup={popup} setPopup={setPopup}></Popup>
            }
        </>
    );
}

