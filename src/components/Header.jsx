import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
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
                        <NavLink to='/signIn'>로그인</NavLink>
                        <NavLink to='/signUp'>회원가입</NavLink>
                    </div>
                </nav>
                <button>메뉴 열기</button>
            </div>
        </header>
    );
}

