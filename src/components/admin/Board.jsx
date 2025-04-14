import React from 'react';
import SelectBox from '../SelectBox';
import Pagination from '../Pagination';

export default function Board({ children }) {
    return (
        <>
            <div className='board-registration'>
                <label htmlFor="">등록일</label>
                <div>
                    <input type="date" min="2025-01-20" max="2025-12-31"/>
                    ~
                    <input type="date" />
                    <button className='btn-gray'>전체</button>
                    <button className='btn-gray'>오늘</button>
                    <button className='btn-gray'>7일</button>
                    <button className='btn-gray'>10일</button>
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
            { children }
            { false && <Pagination /> }
        </>
    );
}

