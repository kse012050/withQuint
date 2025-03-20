import React, { useState } from 'react';
import Board from '../components/Board';
import BoardCustomerLink from '../components/BoardCustomerLink';

export default function CustomerNotice() {
    const [list, setList] = useState()

    return (
        <Board boardType='notice' setList={setList}>
            <div className='board-title'>
                <b>번호</b>
                <p>제목</p>
                <b>등록일자</b>
            </div>
            <ol className="board-list">
                {list && list.map((data)=>
                    <li key={data.id} data-new={data.new}>
                        <BoardCustomerLink data={data}>
                            <span>{data.numb}</span>
                            <p>{data.title}</p>
                            <time>{data.created}</time>
                        </BoardCustomerLink>
                    </li>
                )}
            </ol>
        </Board>
    );
}

