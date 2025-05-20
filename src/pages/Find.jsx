import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Find() {
    return (
        <>
            <ul>
                <li><NavLink to='/find/id'>아이디 찾기</NavLink></li>
                <li><NavLink to='/find/pw'>비밀번호 찾기</NavLink></li>
            </ul>
            <Outlet />
        </>
    );
}

