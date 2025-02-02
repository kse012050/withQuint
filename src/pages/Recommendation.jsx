import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getApi } from '../api/api';

export default function Recommendation() {
    const [info, setInfo] = useState()
    const [list, setList] = useState()
    
    // const queryParams = new URLSearchParams(useLocation().search);
    // const page = queryParams.get('page'); // '1'과 같은 값이 반환됨
    // console.log(page);

    const page = new URLSearchParams(useLocation().search).get('page');
    

    useEffect(()=>{
        getApi('boards', {boardType: 'recommendation', page: page || 1})
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list);
                }
            })
    },[page])

    return (
        <>
            <h2>추천 종목</h2>
            <div>
                <div className='board-menu'>
                    <span>
                        <strong>총 {info?.totalCount}건</strong>
                        ({info?.page}/{info?.totalPage}page)
                    </span>
                    <div className='selectBox'>
                        <button>분류 전체</button>
                        <div>
                            <button>1</button>
                            <button>2</button>
                            <button>3</button>
                        </div>
                    </div>
                    <div className='searchBox'>
                        <input type="search" placeholder='제목'/>
                        <button>검색</button>
                    </div>
                    {/* <Link to='' className='btn-bg'>글쓰기</Link> */}
                </div>
                <div className='board-title'>
                    <b>번호</b>
                    <b>분류</b>
                    <b>제목</b>
                    <b>등록일자</b>
                </div>
                <ol className="board-list">
                    {list && list.map((data, idx)=>
                        <li key={data.id}>
                            <Link to=''>
                                <span>{data.numb}</span>
                                <span>{data.type}</span>
                                <p>{data.title}</p>
                                <time>{data.created}</time>
                            </Link>
                        </li>
                    )}
                </ol>
                {info && <Pagination info={info}/>}
            </div>
        </>
    );
}

