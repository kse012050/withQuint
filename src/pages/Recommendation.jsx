import React, { useState } from 'react';
import Board from '../components/Board';
import BoardLink from '../components/BoardLink';

export default function Recommendation() {
    const [list, setList] = useState()
    
    return (
        <>
            <Board boardType='recommendation' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <p>제목</p>
                    <b>등록일자</b>
                </div>
                <ol className="board-list">
                    {list && list.map((data, idx)=>
                        <li key={data.id} data-new={data.new}>
                            <BoardLink data={data}>
                                <span>{data.numb}</span>
                                <span>{{ 'free': '무료', 'vip': 'VIP' }[data.type]}</span>
                                <p>{data.title}</p>
                                <time>{data.created}</time>
                            </BoardLink>
                        </li>
                    )}
                </ol>
            </Board>
        </>
    );
}

