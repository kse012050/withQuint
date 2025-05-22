import React from 'react';
import { useLocation } from 'react-router-dom';

const titleName = {
    user: '회원목록',
    introduction: '위드퀀트 소개',
    vipProduct: 'VIP상품 안내',
    recommendation: '추천 종목',
    revenue: '수익률',
    stock: '웰스 주식정보',
    customer: '고객센터',
    signIn: '로그인',
    find: '로그인 계정 찾기',
    infoChange: '정보변경',
    signUp: '회원가입',
    vip: 'VIP상품 신청',
    clinic: '주식상담소',
    notice: '공지사항',   
}

export default function SubTitle() {
    const isAdmin = useLocation().pathname.includes('admin');
    const pageName = useLocation().pathname.slice(1).split('/')[+isAdmin];
    
    if(!pageName){
        return
    }
    return (
        <>
            <h2>{ titleName[pageName] }</h2>
        </>
    );
}

