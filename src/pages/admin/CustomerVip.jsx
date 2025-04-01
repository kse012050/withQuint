import React from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function CustomerVip() {
    return (
        <>
            <h2>VIP 상품 신청</h2>
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

