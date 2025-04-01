import React from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function Vip() {
    return (
        <>
            <h2>VIP 상품</h2>
            <button className='btn-bg-small'>테스트</button>
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

