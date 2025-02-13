import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { getApi } from '../api/api';
import SelectBox from '../components/SelectBox';
import { inputChange } from '../api/validation';

export default function Recommendation() {
    const [info, setInfo] = useState()
    const [list, setList] = useState()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const [search, setSearch] = useState({type: queryObject.type, search: queryObject.search});
    
    
    useEffect(()=>{
        getApi('boards', {boardType: 'recommendation', ...queryObject, page: queryObject.page || 1})
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list);
                }
            })
    },[searchParams])

    const onSearch = () =>{
        const url = '?' + new URLSearchParams(search);
        navigate(url)
    }

    return (
        <>
            <h2>추천 종목</h2>
            <div>
                <div className='board-menu'>
                    <span>
                        <strong>총 {info?.totalCount}건</strong>
                        ({info?.page}/{info?.totalPage}page)
                    </span>
                    <SelectBox type={search?.type} setSearch={setSearch}/>
                    <div className='searchBox'>
                        <input type="search" placeholder='제목' name='search' defaultValue={queryObject.search} onChange={(e)=> inputChange(e, setSearch)}/>
                        <button onClick={onSearch}>검색</button>
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
                        <li key={data.id} data-new={data.new}>
                            <Link to=''>
                                <span>{data.numb}</span>
                                <span>{{ 'free': '무료', 'vip': 'VIP' }[data.type]}</span>
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

