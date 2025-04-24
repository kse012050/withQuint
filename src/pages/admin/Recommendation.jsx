import React, { useState } from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function Recommendation() {
    const [list, setList] = useState()
    
    return (
        <>
            {/* <Link to='create' className='btn-bg-small'>생성</Link> */}
            <Board boardType='recommendation' setList={setList}>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <p>제목</p>
                    <b className='time'>등록일자</b>
                    <b>상태</b>
                </div>
                <ol className='board-list'>
                    {list && list.map((data) => 
                        <li key={data.id}>
                            <Link to={`${data.id}`}>
                                <span>{ data.numb }</span>
                                <span>{data.type}</span>
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

