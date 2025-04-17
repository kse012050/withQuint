import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Board from '../../components/admin/Board';

export default function Stock() {
    const [list, setList] = useState()

    return (
        <>
            <button className='btn-bg-small'>생성</button>
            <Board boardType='stock' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b className='img'>대표이미지</b>
                    <p>제목</p>
                    <b className='time'>등록일자</b>
                    <b>상태</b>
                </div>
                <ol className='board-list'>
                    {list && list.map((data) => 
                        <li key={data.id}>
                            <Link to=''>
                                <span>{ data.numb }</span>
                                <img src={data.image} alt="" />
                                <p>{ data.title }</p>
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

