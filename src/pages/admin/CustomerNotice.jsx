import React from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';

export default function CustomerNotice() {
    return (
        <>
            <h2>공지사항</h2>
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

