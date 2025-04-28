import React, { useEffect, useMemo, useState } from 'react';
import SelectBox from '../SelectBox';
import Pagination from '../Pagination';
import { getApi } from '../../api/api';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { inputChange } from '../../api/validation';

const dateSelects = [
    { label: '전체', value: undefined },
    { label: '오늘', value: 1 },
    { label: '7일', value: 7 },
    { label: '30일', value: 30 }
  ];

const day = (date) => {
    return new Date(new Date().setDate(new Date().getDate() - (date || 1))).toISOString().split('T')[0];
}

export default function Board({ children, boardType, setList }) {
    const [info, setInfo] = useState()
    const dateEnd = day();
    const [search, setSearch] = useState({dateEnd: dateEnd});
    const [dateSelect, setDateSelect] = useState(dateSelects[0].label);
    const navigate = useNavigate();
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const queryObject = useMemo(() => ({ dateEnd: dateEnd, ...Object.fromEntries(searchParams.entries()) }), [searchParams, dateEnd]);
    const passName = useLocation().pathname.split('/').at(-1);
    const isCreate = ['recommendation', 'revenue', 'stock', 'notice']
    
    useEffect(()=>{
        setSearch({...queryObject})
    },[location, queryObject])
    
    
    useEffect(()=>{
        getApi('admin/boards', {boardType: boardType, ...queryObject, page: queryObject?.page || 1})
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list)
                }
            })
    }, [boardType, setList, queryObject])

    const onDate = (e) =>{
        const { name, value } = e.target;
        navigate('?' + new URLSearchParams({...search, [name]: value}))
    }

    const onDateSelect = (e) => {
        const { value, innerText } = e.target;
        navigate('?' + new URLSearchParams({...search, dateStart: value ? day(value) : '', dateEnd: day()}))
        setDateSelect(innerText)
    }

    const onSearch = () =>{
        navigate('?' + new URLSearchParams(search))
    }
    return (
        <>
            { isCreate.includes(passName) && <Link to='create' className='btn-bg-small'>생성</Link> }
            <div className='board-registration'>
                <label htmlFor="">등록일</label>
                <div>
                    <input type="date" name='dateStart' value={search?.dateStart || ''} onChange={onDate} max={search?.dateEnd}/>
                    ~
                    <input type="date" name='dateEnd' value={search?.dateEnd || ''} onChange={onDate} min={search?.dateStart} max={search?.dateEnd}/>
                    {dateSelects.map((data, index) =>
                        <button key={index} className={`btn-gray ${dateSelect === data.label ? 'active' : ''}`} value={data.value} onClick={onDateSelect}>{data.label}</button>
                    )}
                </div>
            </div>
            <div className='board-search'>
                <label htmlFor="">검색어</label>
                <div className='searchBox'>
                    <input type="search" placeholder='제목' name='search' value={search?.search || ''} onChange={(e) => inputChange(e, setSearch)} onKeyDown={(e)=> e.key === 'Enter' && onSearch(e)}/>
                    <button onClick={onSearch}>검색</button>
                </div>
            </div>
            <span className='board-cases'>총 {info?.totalCount}건</span>
            <ul className='board-select'>
                <li>
                    <SelectBox type={search?.type} setSearch={setSearch}/>
                </li>
            </ul>
            { children }
            {!!info?.totalPage && info && <Pagination info={info}/>}
        </>
    );
}

