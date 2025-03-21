import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer>
            <ul>
                <li><Link to=''>회사소개</Link></li>
                <li><Link to=''>이용약관</Link></li>
                <li><Link to=''>개인정보처리방침</Link></li>
                <li><Link to=''>고객센터</Link></li>
            </ul>
            <div>logo</div>
            <address>
                <p>인천광역시 동수 송현로 50</p>
                <dl>
                    <dt>대표자</dt>
                    <dd>이정호</dd>
                </dl>
                <dl>
                    <dt>사업자등록번호</dt>
                    <dd>355-77-00601</dd>
                </dl>
                <dl>
                    <dt>개인정보관리자</dt>
                    <dd>이정호</dd>
                </dl>
                <dl>
                    <dt>이메일</dt>
                    <dd>junghonim@naver.com</dd>
                </dl>
            </address>
            <p>Copyright © 위드퀀트. All Rights Reserved</p>
            <ul>
                <li>
                    <p>고객센터 문의</p>
                    <Link to=''>junghonim@naver.com</Link>
                </li>
                <li>
                    <p>계좌안내</p>
                    <strong>
                        카카오뱅크 <button>3333-31-5182373</button><br/>
                        위드퀀트
                    </strong>
                </li>
            </ul>
            <ul data-styleidx>
                <li>금융감독원</li>
                <li>국세청</li>
                <li>SGI 서울 보증</li>
            </ul>
        </footer>
    );
}

