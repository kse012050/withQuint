import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getApi } from '../api/api';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SelectBox from './SelectBox';
import { inputChange } from '../api/validation';
import Pagination from './Pagination';
import { ThemeContext } from '../context/ThemeContext';

export default function Board({ children, boardType, setList }) {
    const [info, setInfo] = useState()
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation()
    const queryObject = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
    const [search, setSearch] = useState();
    const { user } = useContext(ThemeContext);
    const isSelectBox = ['revenue', 'recommendation'];
    const isCreateBox = ['vip', 'clinic']
    
    // const isSelectBox = boardType === 'revenue' || boardType === 'recommendation';

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
                { isSelectBox.includes(boardType) && <SelectBox type={search?.type} setSearch={setSearch}/> }
                <div className='searchBox'>
                    <input type="search" placeholder='제목' name='search' value={search?.search || ''} onChange={(e)=> inputChange(e, setSearch)} onKeyDown={(e)=> e.key === 'Enter' && onSearch(e)}/>
                    <button onClick={onSearch}>검색</button>
                </div>
                { (isCreateBox.includes(boardType) && user) && <Link to='create' className='btn-bg-small'>글쓰기</Link> }
            </div>

            <div className="board-scroll">
                {children}
            </div>

            {!!info?.totalPage && info && <Pagination info={info}/>}
        </div>
    );
}

