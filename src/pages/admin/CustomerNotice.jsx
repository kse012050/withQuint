import React, { useState } from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function CustomerNotice() {
    const [list, setList] = useState()

    return (
        <>
            <Board boardType='notice' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <p>제목</p>
                    <b>작성자</b>
                    <b className='time'>등록일자</b>
                    <b>상태</b>
                </div>
                <ol className='board-list'>
                    {list && list.map((data) => 
                        <li key={data.id}>
                            <Link to={`${data.id}`}>
                                <span>{ data.numb }</span>
                                <p>{ data.title }</p>
                                <span>{ data.author }</span>
                                <time>{ data.created }</time>
                                <span>{ data.visible }</span>
                            </Link>
                        </li>
                    )}
                </ol>
            </Board>
        </>
    );
}

