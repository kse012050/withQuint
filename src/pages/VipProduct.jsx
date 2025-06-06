import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApi } from '../api/api';

export default function VipProduct() {
    const [ vipProducts, setVipProducts ] = useState()

    useEffect(()=>{
        getApi('vipProducts')
            .then(({ result, state, list } = {})=>{
                if(result && state){
                    setVipProducts(list);
                }
            })
    },[])

    return (
        <>
            <div>
                <h3>VIP 상품</h3>
                {vipProducts && 
                    <ul>
                    {vipProducts.map((data)=>
                        <li key={data.id}>
                            <strong>
                                {data.name}
                                <span>{data.price}만원</span>
                            </strong>
                            <p>{data.description}</p>
                            <small>
                                *자세항 사항은 고객센터 VIP 상품 신청에
                                글을 남겨 주세요.
                            </small>
                            <div style={{backgroundImage: `url(${data.image || 'https://placehold.co/600x400'})`}}>
                                {data.nameEng}
                                <mark>{data.name}</mark>
                            </div>
                            <Link>VIP 상품 신청하기</Link>
                        </li>
                    )}
                    </ul>
                }
            </div>
        </>
    );
}

