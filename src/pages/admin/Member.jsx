import React from 'react';
import SelectBox from '../../components/SelectBox';
import { Link } from 'react-router-dom';

export default function Member() {
    return (
        <>
            <h2>회원목록</h2>
            <button className='btn-bg-small'>테스트</button>
            <div className='board-registration'>
                <label htmlFor="">등록일</label>
                <div>
                    <input type="date" />
                    ~
                    <input type="date" />
                    <button>전체</button>
                    <button>오늘</button>
                    <button>7일</button>
                    <button>10일</button>
                </div>
            </div>
            <div className='board-search'>
                <label htmlFor="">검색어</label>
                <div className='searchBox'>
                    <input type="text" placeholder='제목'/>
                    <button>검색</button>
                </div>
            </div>
            <span className='board-cases'>총 75건</span>
            <ul className='board-select'>
                <li>
                    <SelectBox />
                </li>
            </ul>
            <div className='board-title'>
                <b>1</b>
            </div>
            <ol className='board-list'>
                <li>
                    <Link to=''>
                        <span>1</span>
                    </Link>
                </li>
            </ol>
        </>
    );
}

