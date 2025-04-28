import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { postApi } from '../api/api';

export default function BoardCustomerLink({ data, children }) {
    const [popup, setPopup] = useState();
    const navigate = useNavigate()
    const pathName = useLocation().pathname + (useLocation().pathname === '/customer' ? '/vip' : '');
    const id = data.id;
    const link = pathName.split('/').filter((data) => !Number(data)).join('/') + '/' + id
    const isSecret = data.secret === 'y';
    
    const onClick = (e) => {
        e.preventDefault();
        postApi('boards/isSecret', {boardId: data.id})
            .then(({ result, state })=>{
                if(result){
                    if(state){
                        navigate(link)
                    }else{
                        setPopup({
                            type: 'lock'
                        })
                    }
                }
            })
    }
    
    return (
        <>
            <Link 
                to={link}
                className={isSecret ? 'secret' : ''}
                onClick={isSecret && onClick}
            >
                {children}
            </Link>
            { popup && 
                <Popup popup={popup} setPopup={setPopup}></Popup>
            }
        </>
    );
}

