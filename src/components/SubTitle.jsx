import React from 'react';
import { useLocation } from 'react-router-dom';

const titleName = {
    introduction: '위드퀀트 소개',
    vip: 'VIP상품 안내',
    recommendation: '추천 종목',
    revenue: '수익률',
    stock: '웰스 주식정보',
    customer: '고객센터',
    signIn: '로그인',
    signUp: '회원가입'
}

export default function SubTitle() {
    const pageName = useLocation().pathname.slice(1).split('/')[0] || 'main';
    if(!pageName){
        return
    }
    return (
        <>
            <h2>{ titleName[pageName] }</h2>
        </>
    );
}

