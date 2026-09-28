import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SelectBox from '../SelectBox';
import Pagination from '../Pagination';
import { getApi } from '../../api/api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SearchBox from './SearchBox';
import { day } from '../../js/utils';

export default function Board({ children, boardType, setList }) {
    const dateEnd = day();
    const [search, setSearch] = useState({dateEnd: dateEnd});
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const queryObject = useMemo(() => ({ dateEnd: dateEnd, ...Object.fromEntries(searchParams.entries()) }), [searchParams, dateEnd]);
    const passName = useLocation().pathname.split('/').at(-1);
    const isCreate = ['recommendation', 'revenue', 'stock', 'notice']
    const isType = ['recommendation', 'revenue']
    const { data, isError } = useQuery({
        queryKey: ['admin', 'boards', 'list', boardType, queryObject],
        queryFn: async () => {
            const response = await getApi('admin/boards', {boardType, ...queryObject, page: queryObject.page || 1});
            if (!response?.result) {
                throw new Error('Failed to load admin boards');
            }
            return response;
        },
    });
    const info = data?.info;
    
    useEffect(()=>{
        setSearch({...queryObject})
    },[location, queryObject])
    
    
    useEffect(()=>{
        setList(data?.list);
    }, [data, setList])

    return (
        <>
            {isError && <p role="alert">게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p>}
            { isCreate.includes(passName) && <Link to='create' className='btn-bg-small'>생성</Link> }
            <SearchBox search={search} setSearch={setSearch}/>
            <span className='board-cases'>총 {info?.totalCount}건</span>
            { isType.includes(passName) &&
                <div className='board-select'>
                    <SelectBox type={search?.type} setSearch={setSearch}/>
                </div>
            }
            { children }
            {!!info?.totalPage && info && <Pagination info={info}/>}
        </>
    );
}

