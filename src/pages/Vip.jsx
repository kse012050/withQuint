import React from 'react';
import { Link } from 'react-router-dom';

export default function Vip() {
    return (
        <>
            <h2>VIP상품 안내</h2>
            <div>
                <h3>VIP 상품</h3>
                <ul>
                    <li>
                        <div>TRINITY
                            <mark>트리니티</mark>
                        </div>
                        <strong>
                            트리니티
                            <span>300만원</span>
                        </strong>
                        <p>
                            무제한 리딩안내<br/>
                            실시간 채팅 제공<br/>
                            월 200%수익보장
                        </p>
                        <small>
                            *자세항 사항은 고객센터 VIP 상품 신청에
                            글을 남겨 주세요.
                        </small>
                        <Link>VIP 상품 신청하기</Link>
                    </li>
                    <li>
                        <div>
                            <span>상품명 영문</span>
                            <mark>상품명</mark>
                        </div>
                        <strong>
                            상품 추가 시 반복 유형
                            <span>300만원</span>
                        </strong>
                        <p>
                            무제한 리딩안내<br/>
                            실시간 채팅 제공<br/>
                            월 200%수익보장
                        </p>
                        <small>
                            *자세항 사항은 고객센터 VIP 상품 신청에
                            글을 남겨 주세요.
                        </small>
                        <Link>VIP 상품 신청하기</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

