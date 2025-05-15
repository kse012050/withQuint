import React, { useState } from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function CustomerClinic() {
    const [list, setList] = useState()

    return (
        <>
            <Board boardType='clinic' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <p>제목</p>
                    <b>작성자</b>
                    <b className='time'>등록일자</b>
                </div>
                <ol className='board-list'>
                    {list && list.map((data) => 
                        <li key={data.id} className={data.secret === 'y' ? 'secret' : ''}>
                            <Link to={`${data.id}`}>
                                <span>{ data.numb }</span>
                                <p>{ data.title }</p>
                                <span>{ data.author }</span>
                                <time>{ data.created }</time>
                            </Link>
                        </li>
                    )}
                </ol>
            </Board>
        </>
    );
}

