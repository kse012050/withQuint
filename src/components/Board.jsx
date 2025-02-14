import React, { useEffect, useState } from 'react';
import { getApi } from '../api/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SelectBox from './SelectBox';
import { inputChange } from '../api/validation';
import Pagination from './Pagination';

export default function Board({ children, setList }) {
    const [info, setInfo] = useState()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const [search, setSearch] = useState({...queryObject});

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
        <div>
            <div className='board-menu'>
                <span>
                    <strong>총 {info?.totalCount}건</strong>
                    ({info?.page}/{info?.totalPage}page)
                </span>
                <SelectBox type={search?.type} setSearch={setSearch}/>
                <div className='searchBox'>
                    <input type="search" placeholder='제목' name='search' defaultValue={queryObject?.search} onChange={(e)=> inputChange(e, setSearch)}/>
                    <button onClick={onSearch}>검색</button>
                </div>
                {/* <Link to='' className='btn-bg'>글쓰기</Link> */}
            </div>

            {children}

            {info && <Pagination info={info}/>}
        </div>
    );
}

