import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Customer() {
    return (
        <>
            <h2>추천 종목</h2>
            <ul>
                <li><NavLink to=''>VIP 상품 신청</NavLink></li>
                <li><NavLink to=''>주식상담소</NavLink></li>
                <li><NavLink to=''>공지사항</NavLink></li>
            </ul>
            <div>
                <h3>VIP 상품 신청</h3>
                <div className='boardBox'>
                    <strong>총 1234건 (1/10page)</strong>
                    <div>
                        <input type="search" />
                        <button>검색</button>
                    </div>
                    <Link to=''>글쓰기</Link>
                    <div>
                        <strong>번호</strong>
                        <strong>제목</strong>
                        <strong>작성자</strong>
                        <strong>등록일자</strong>
                    </div>
                    <ol>
                        <li>
                            <Link to=''>
                                <span>1234</span>
                                <p>VIP 상품 신청합니다~!!</p>
                                <span>전업투자자</span>
                                <time>2023.10.26</time>
                            </Link>
                        </li>
                    </ol>
                    <div>
                        <Link to=''>처음</Link>
                        <Link to=''>이전</Link>
                        <ol>
                            <li><Link to=''>1</Link></li>
                            <li><Link to=''>2</Link></li>
                            <li><Link to=''>3</Link></li>
                            <li><Link to=''>4</Link></li>
                            <li><Link to=''>5</Link></li>
                        </ol>
                        <Link to=''>다음</Link>
                        <Link to=''>마지막</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

