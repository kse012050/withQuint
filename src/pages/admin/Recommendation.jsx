import React, { useEffect, useState } from 'react';
import Board from '../../components/admin/Board';
import { Link } from 'react-router-dom';
import { getApi } from '../../api/api';

export default function Recommendation() {
    const [list, setList] = useState()

    useEffect(()=>{
        getApi('admin/boards', {boardType: 'recommendation'})
            .then((response)=>{
                const {result, list} = response || {};
                console.log(response);
                if(result){
                    // setList(result);
                    setList(list)
                }
            })
    }, [])
    return (
        <>
            <h2>추천 종복</h2>
            <button className='btn-bg-small'>생성</button>
            <Board>
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
                            <Link to=''>
                                <span>{ data.numb }</span>
                                <span>{{ 'free': '무료', 'vip': 'VIP' }[data.type]}</span>
                                <p>{ data.title }</p>
                                <time>{ data.created }</time>
                                <span>{ data.visible ? '노출' : '숨김' }</span>
                            </Link>
                        </li>
                    )}
                </ol>
            </Board>
        </>
    );
}

