import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Header() {
    const { isLogin } = useContext(ThemeContext);
    return (
        <header>
            <div>
                <h1><Link to='/'>위드퀸트</Link></h1>
                <nav>
                    <ul>
                        <li><NavLink>소개</NavLink></li>
                        <li><NavLink>VIP상품</NavLink></li>
                        <li><NavLink>추천종목</NavLink></li>
                        <li><NavLink>수익률</NavLink></li>
                        <li><NavLink>주식정보</NavLink></li>
                        <li><NavLink>고객센터</NavLink></li>
                    </ul>
                    <div>
                        { !isLogin ? 
                            <>
                                <NavLink to='/signIn'>로그인</NavLink>
                                <NavLink to='/signUp'>회원가입</NavLink>
                            </> :
                            <>
                                <NavLink to='/signIn'>로그아웃</NavLink>
                            </>
                        }
                    </div>
                </nav>
                <button>메뉴 열기</button>
            </div>
        </header>
    );
}

