import React, { useEffect } from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';
import { postApi } from '../../api/api';

export default function Recommendation() {

    useEffect(()=>{
        postApi('admin/boards', {boardType: 'recommendation'})
            .then((response)=>{
                const {result, /* message, */} = response || {};
                console.log(response);
                if(result){
                    // setList(result);
                }
            })
    }, [])
    return (
        <>
            <h2>추천 종복</h2>
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

