import React, { useContext, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { postApi } from '../api/api';

export default function Header() {
    const { user, setUser } = useContext(ThemeContext);
    const [ isMobileMenu, setIsMobileMenu ] = useState(false)
    const isCustomerActive = useLocation().pathname.includes('customer')
    

    const onLogout = () => {
        postApi('logout')
            .then(( response )=>{
                const { result } = response || {};
                if(result){
                    setUser(false)
                    sessionStorage.removeItem("user")
                }
            })
    }
    return (
        <header className={isMobileMenu ? 'active' : ''}>
            <div>
                <h1><Link to='/'>위드퀸트</Link></h1>
                <nav>
                    <ul>
                        <li><NavLink to='/introduction'>소개</NavLink></li>
                        <li><NavLink to='/vipProduct'>VIP상품</NavLink></li>
                        <li><NavLink to='/recommendation'>추천종목</NavLink></li>
                        <li><NavLink to='/revenue'>수익률</NavLink></li>
                        <li><NavLink to='/stock'>주식정보</NavLink></li>
                        <li><NavLink to='/customer/vip' className={isCustomerActive && 'active'}>고객센터</NavLink></li>
                    </ul>
                    <div>
                        { !user ? 
                            <>
                                <NavLink to='/signIn'>로그인</NavLink>
                                <NavLink to='/signUp'>회원가입</NavLink>
                            </> :
                            <>
                                <button onClick={onLogout}>로그아웃</button>
                            </>
                        }
                    </div>
                </nav>
                <button onClick={() => setIsMobileMenu(cur => !cur)}>메뉴 열기</button>
            </div>
        </header>
    );
}

