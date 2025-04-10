import React, { useState } from 'react';
import Board from '../components/Board';
import BoardLink from '../components/BoardLink';

export default function Revenue() {
    const [list, setList] = useState()

    return (
        <>
            <Board boardType='revenue' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <p>제목</p>
                    <b className='time'>등록일자</b>
                </div>
                <ol className="board-list">
                    {list && list.map((data)=>
                        <li key={data.id} data-new={data.new}>
                            <BoardLink data={data}>
                                <span>{data.numb}</span>
                                <span>{data.type}</span>
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

