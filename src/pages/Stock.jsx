import React, { useState } from 'react';
import Board from '../components/Board';
import { Link } from 'react-router-dom';

export default function Stock() {
    const [list, setList] = useState();
    return (
        <>
            <h2>웰스 주식정보</h2>   
            <Board boardType='stock' setList={setList}>
                <ul className='board-list-img'>
                    {list && list.map((data, idx)=>
                        <li key={data.id} data-new={data.new}>
                            <Link to=''>
                                <img src={data.image} alt={`${data.title} 이미지`} />
                                <p>{data.title}</p>
                                <time>{data.created}</time>
                            </Link>
                        </li>
                    )}
                </ul>
            </Board>
        </>
    );
}

