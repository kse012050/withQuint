import React from 'react';
import { Link } from 'react-router-dom';

export default function Detail() {
    return (
        <>
            <h2>상세보기</h2>
            <ul>
                <li>
                    <label htmlFor="">테스트</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">테스트</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">테스트</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">테스트</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">테스트</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
            </ul>
            <div>
                <Link to='' className='btn-gray'>목록</Link>
                <button className='btn-bg-small'>수정</button>
            </div>
        </>
    );
}

