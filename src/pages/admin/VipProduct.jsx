import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApi } from '../../api/api';

export default function VipProduct() {
    const [ vipProducts, setVipProducts ] = useState()

    useEffect(()=>{
        getApi('admin/vipProducts/read')
            .then(({ result, state, list } = {})=>{
                if(result && state){
                    setVipProducts(list);
                }
            })
    },[])

    return (
        <>
            <Link to='create' className='btn-bg-small'>생성</Link>
            <div className='board-title'>
                <b>번호</b>
                <b className='img'>대표이미지</b>
                <b>이름</b>
                <p>내용</p>
                <b className='time'>등록일자</b>
                <b>상태</b>
            </div>
            <ol className='board-list'>
                {vipProducts && vipProducts.map((data) => 
                    <li key={data.id}>
                        <Link to={`${data.id}`}>
                            <span>{ data.numb }</span>
                            <img src={data.image} alt={`${data.name} 이미지`} />
                            <span>{ data.name }</span>
                            <p>{ data.description }</p>
                            <time>{ data.created }</time>
                            <span>{ data.visible }</span>
                        </Link>
                    </li>
                )}
            </ol>
        </>
    );
}

