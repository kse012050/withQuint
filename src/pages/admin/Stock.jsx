import React from 'react';
import { Link } from 'react-router-dom';
import Board from '../../components/admin/Board';

export default function Stock() {
    return (
        <>
            <h2>주식정보</h2>
            <button className='btn-bg-small'>생성</button>
            <Board>
                <div className='board-title'>
                    <b>1</b>
                </div>
                <ol className='board-list'>
                    <li>
                        <Link to=''>
                            <span>1</span>
                        </Link>
                    </li>
                </ol>
            </Board>
        </>
    );
}

