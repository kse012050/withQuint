import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../../components/admin/SearchBox';
import { day } from '../../js/utils';
import { getApi } from '../../api/api';
import Pagination from '../../components/Pagination';

export default function User() {
    const [list, setList] = useState()
    const [info, setInfo] = useState()
    const [search, setSearch] = useState({dateEnd: day()});

    useEffect(()=> {
        getApi('users')
            .then(({ result, info, list } = {}) => {
                if(result){
                    setInfo(info);
                    setList(list)
                }
            })
    }, [])

    return (
        <>
            <SearchBox search={search} setSearch={setSearch}/>
            <span className='board-cases'>총 {info?.totalCount}건</span>
            <div className='board-title'>
                <b>번호</b>
                <b>아이디</b>
                <b>닉네임</b>
                <b>핸드폰번호</b>
                <b className='time'>최종로그인</b>
                <b>회원 타입</b>
                <b className='time'>가입일</b>
            </div>
            <ol className='board-list'>
                {list && list.map((data) => 
                    <li key={data.id}>
                        <Link to={`${data.id}`}>
                            <span>{ data.id }</span>
                            <span>{ data.userId }</span>
                            <span>{ data.author }</span>
                            <span>{ data.mobile }</span>
                            <time>{ data.lastLogin }</time>
                            <span>{ data.type }</span>
                            <time>{ data.created }</time>
                        </Link>
                    </li>
                )}
            </ol>
            {!!info?.totalPage && info && <Pagination info={info}/>}
        </>
    );
}

