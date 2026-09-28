import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getApi } from '../api/api';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SelectBox from './SelectBox';
import { inputChange } from '../api/validation';
import Pagination from './Pagination';
import { ThemeContext } from '../context/ThemeContext';

export default function Board({ children, boardType, setList }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation()
    const queryObject = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);
    const [search, setSearch] = useState();
    const { user } = useContext(ThemeContext);
    const isSelectBox = ['revenue', 'recommendation'];
    const isCreateBox = ['vip', 'clinic']
    const { data, isError } = useQuery({
        queryKey: ['boards', 'list', boardType, queryObject],
        queryFn: async () => {
            const response = await getApi('boards', {boardType, ...queryObject, page: queryObject.page || 1});
            if (!response?.result) {
                throw new Error('Failed to load boards');
            }
            return response;
        },
    });
    const info = data?.info;
    
    // const isSelectBox = boardType === 'revenue' || boardType === 'recommendation';

    useEffect(()=>{
        setSearch({...queryObject})
    },[location, queryObject])
    
    useEffect(()=>{
        setList(data?.list);
    },[data, setList])

    const onSearch = () =>{
        const url = '?' + new URLSearchParams(search);
        navigate(url)
    }
    
    return (
        <div>
            {isError && <p role="alert">게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>}
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

