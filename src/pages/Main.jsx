import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getApi } from '../api/api';

export default function Main() {
    const [data, setData] = useState();

    useEffect(()=>{
        getApi('boards/main')
            .then(({ result, data } = {}) => {
                if(result){
                    console.log(data);
                    setData(data);
                }
            })
    }, [])

    return (
        <>
            <p>
                부(Wealth)의 지름길!
                <strong>위드퀀트가 안내합니다</strong>
            </p>
            <div>
                <section>
                    <h2>공지사항</h2>
                    <ul>
                        {data && data.notice.map((data) => 
                            <li key={data.id}>
                                <Link to=''>
                                    <p>{ data.title }</p>
                                    <time>{ data.time }</time>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
                <div>
                    <h2>VIP 상품 신청</h2>
                    <strong>
                        위드퀀트의 수익 실현!<br/>
                        직접 경험하고 확인하세요
                    </strong>
                    <Link to=''>바로가기</Link>
                </div>
                <section className='serviceArea'>
                    <h2>주요 서비스</h2>
                    <ul data-styleidx>
                        <li><Link to=''>무료 추천종목</Link></li>
                        <li><Link to=''>주식 상담소</Link></li>
                        <li><Link to=''>VIP 추천종목</Link></li>
                        <li><Link to=''>매매 수익률</Link></li>
                    </ul>
                </section>
                <section>
                    <h2>무료 추천종목</h2>
                    <Link to='' className='textHide'>게시판 바로가기</Link>
                    <ul>
                        {data && data.recommendation.map((data) => 
                            <li key={data.id}>
                                <Link to=''>
                                    <p>{ data.title }</p>
                                    <time>{ data.created }</time>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
                <section>
                    <h2>VIP 상품 신청</h2>
                    <Link to='' className='textHide'>게시판 바로가기</Link>
                    <ul>
                        {data && data.vip.map((data) => 
                            <li key={data.id}>
                                <Link to=''>
                                    <p>{ data.title }</p>
                                    <time>{ data.created }</time>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
                <section>
                    <h2>위드퀀트 주식정보</h2>
                    <Link to='' className='textHide'>게시판 바로가기</Link>
                    <ul>
                        {data && data.stock.map((data) => 
                            <li key={data.id} style={{backgroundImage: `url(${data.image})`}}>
                                <Link to=''>
                                    <p>{ data.title }</p>
                                    <time>{ data.created }</time>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
                <section>
                    <h2>수익률</h2>
                    <Link to='' className='textHide'>게시판 바로가기</Link>
                    <ul>
                        {data && data.revenue.map((data) => 
                            <li key={data.id}>
                                <Link to=''>
                                    <p>{ data.title }</p>
                                    <time>{ data.created }</time>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
            </div>
            <div className='principle'>
                <h2>위드퀀트의 원칙</h2>
                <ul>
                    <li>
                        개인투자자들의
                        <strong>회원님의 투자금을</strong>
                    </li>
                    <li>
                        허위 수익률을
                        <strong>투자금을 받지 않습니다.</strong>
                    </li>
                    <li>
                        일임 받아 투자하지 않습니다.
                        <strong>기재하지 않습니다.</strong>
                    </li>
                    <li>
                        회원유치를 위해
                        <strong>금융감독원의</strong>
                    </li>
                    <li>
                        허위 과대 광고를 하지 않습니다.
                        <strong>규정을 준수하여 운영합니다.</strong>
                    </li>
                </ul>
            </div>
        </>
    );
}

