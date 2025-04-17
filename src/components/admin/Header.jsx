import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { postApi } from '../../api/api';

export default function Header() {
    const navigate = useNavigate()

    const onLogout = () => {
        postApi('admin/logout')
            .then(({ result, state })=>{
                if(result && state){
                    navigate('/admin')
                }
            })
    }

    return (
        <header>
            <div>
                <h1><Link to='/admin/dashboard'>위드퀸트 관리자 로고</Link></h1>
                <button className='btn-bg-small' onClick={onLogout}>로그아웃</button>
            </div>
            <nav>
                <ul>
                    <li>
                        <strong>회원 관리</strong>
                        <ul>
                            <li><NavLink to='member'>회원목록</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <strong>정보게시판</strong>
                        <ul>
                            <li><NavLink to='recommendation'>추천종목</NavLink></li>
                            <li><NavLink to='revenue'>수익률</NavLink></li>
                            <li><NavLink to='stock'>주식정보</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <strong>고객센터</strong>
                        <ul>
                            <li><NavLink to='customer/vip'>VIP상품신청</NavLink></li>
                            <li><NavLink to='customer/clinic'>주식상담소</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <strong>사이트 관리</strong>
                        <ul>
                            <li><NavLink to='vip'>VIP 상품</NavLink></li>
                            <li><NavLink to='customer/notice'>공지사항</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

