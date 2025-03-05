import React, { useState } from 'react';
import Board from '../components/Board';
import { Link } from 'react-router-dom';
import SubTitle from '../components/SubTitle';

export default function Stock() {
    const [list, setList] = useState();
    return (
        <>
            <SubTitle />
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

