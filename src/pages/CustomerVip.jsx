import React, { useState } from 'react';
import Board from '../components/Board';
import BoardLink from '../components/BoardLink';

export default function CustomerVip() {
    const [list, setList] = useState()

    return (
        <Board boardType='vip' setList={setList}>
            <div className='board-title'>
                <b>번호</b>
                <p>제목</p>
                <b>작성자</b>
                <b className='time'>등록일자</b>
            </div>
            <ol className="board-list">
                {list && list.map((data)=>
                    <li key={data.id} data-new={data.new}>
                        <BoardLink data={data}>
                            <span>{data.numb}</span>
                            <p>{data.title}</p>
                            <span>{data.author}</span>
                            <time>{data.created}</time>
                        </BoardLink>
                    </li>
                )}
            </ol>
        </Board>
    );
}

