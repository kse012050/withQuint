import React, { useState } from 'react';
import Board from '../components/Board';
import { Link } from 'react-router-dom';
import SubTitle from '../components/SubTitle';

export default function Revenue() {
    const [list, setList] = useState()

    return (
        <>
            <SubTitle />
            <Board boardType='revenue' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <p>제목</p>
                    <b>등록일자</b>
                </div>
                <ol className="board-list">
                    {list && list.map((data)=>
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

