import React, { useEffect, useMemo, useState } from 'react';
import SelectBox from '../SelectBox';
import Pagination from '../Pagination';
import { getApi } from '../../api/api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SearchBox from './SearchBox';
import { day } from '../../js/utils';

export default function Board({ children, boardType, setList }) {
    const [info, setInfo] = useState()
    const dateEnd = day();
    const [search, setSearch] = useState({dateEnd: dateEnd});
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const queryObject = useMemo(() => ({ dateEnd: dateEnd, ...Object.fromEntries(searchParams.entries()) }), [searchParams, dateEnd]);
    const passName = useLocation().pathname.split('/').at(-1);
    const isCreate = ['recommendation', 'revenue', 'stock', 'notice']
    const isType = ['recommendation', 'revenue']
    
    useEffect(()=>{
        setSearch({...queryObject})
    },[location, queryObject])
    
    
    useEffect(()=>{
        getApi('admin/boards', {boardType: boardType, ...queryObject, page: queryObject?.page || 1})
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list)
                    console.log(list);
                    
                }
            })
    }, [boardType, setList, queryObject])

    return (
        <>
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

