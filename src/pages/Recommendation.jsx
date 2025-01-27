import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

export default function Recommendation() {
    return (
        <>
            <h2>추천 종목</h2>
            <div>
                <div className='board-menu'>
                    <span>
                        <strong>총 1234건</strong>
                        (1/10page)
                    </span>
                    <div className='selectBox'>
                        <button>분류 전체</button>
                        <div>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='searchBox'>
                        <input type="search" placeholder='제목'/>
                        <button>검색</button>
                    </div>
                    {/* <Link to='' className='btn-bg'>글쓰기</Link> */}
                </div>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <b>제목</b>
                    <b>등록일자</b>
                </div>
                <ol className="board-list">
                    <li>
                        <Link to=''>
                            <span>1234</span>
                            <span>무료</span>
                            <p>10월 26일 목요일 무료추천종목 (35)</p>
                            <time>2023.10.26</time>
                        </Link>
                    </li>
                </ol>
                <Pagination />
            </div>
        </>
    );
}

