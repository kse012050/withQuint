import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Customer() {
    return (
        <>
            <ul>
                <li><NavLink to='/customer/vip'>VIP 상품 신청</NavLink></li>
                <li><NavLink to='/customer/clinic'>주식상담소</NavLink></li>
                <li><NavLink to='/customer/notice'>공지사항</NavLink></li>
            </ul>
            <Outlet />
        </>
    );
}

