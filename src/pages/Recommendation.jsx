import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Board from '../components/Board';

export default function Recommendation() {
    const [list, setList] = useState()
    
    return (
        <>
            <h2>추천 종목</h2>
            <Board setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <b>제목</b>
                    <b>등록일자</b>
                </div>
                <ol className="board-list">
                    {list && list.map((data, idx)=>
                        <li key={data.id} data-new={data.new}>
                            <Link to=''>
                                <span>{data.numb}</span>
                                <span>{{ 'free': '무료', 'vip': 'VIP' }[data.type]}</span>
                                <p>{data.title}</p>
                                <time>{data.created}</time>
                            </Link>
                        </li>
                    )}
                </ol>
            </Board>
        </>
    );
}

