import React, { useEffect, useMemo, useState } from 'react';
import { getApi } from '../api/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SelectBox from './SelectBox';
import { inputChange } from '../api/validation';
import Pagination from './Pagination';

export default function Board({ children, boardType, setList }) {
    const [info, setInfo] = useState()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation()
    const queryObject = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
    const [search, setSearch] = useState();

    const isSelectBox = boardType === 'vip' || boardType === 'recommendation';

    useEffect(()=>{
        setSearch({...queryObject})
    },[location, queryObject])
    
    useEffect(()=>{
        getApi('boards', {boardType, ...queryObject, page: queryObject.page || 1})
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list);
                    console.log(list);
                    
                }
            })
    },[boardType, queryObject, setList])

    const onSearch = () =>{
        const url = '?' + new URLSearchParams(search);
        navigate(url)
    }
    
    return (
        <div>
            <div className='board-menu'>
                <span>
                    <strong>총 {info?.totalCount}건</strong>
                    ({info?.totalPage && info?.page}/{info?.totalPage}page)
                </span>
                { isSelectBox && <SelectBox type={search?.type} setSearch={setSearch}/> }
                <div className='searchBox'>
                    <input type="search" placeholder='제목' name='search' value={search?.search || ''} onChange={(e)=> inputChange(e, setSearch)} onKeyDown={(e)=> e.key === 'Enter' && onSearch(e)}/>
                    <button onClick={onSearch}>검색</button>
                </div>
                {/* <Link to='' className='btn-bg'>글쓰기</Link> */}
            </div>

            {children}

            {!!info?.totalPage && info && <Pagination info={info}/>}
        </div>
    );
}

