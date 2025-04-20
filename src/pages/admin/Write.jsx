import React from 'react';
import { Link } from 'react-router-dom';

export default function Write() {
    return (
        <>
            <ul className='detail-list'>
                <li>
                    <label htmlFor="">No.</label>
                    <div>
                        test
                    </div>
                </li>
                <li>
                    <label htmlFor="">제목</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">내용</label>
                    <div>
                        <textarea name="" id=""></textarea>
                    </div>
                </li>
                <li>
                    <label htmlFor="">이미지</label>
                    <div>
                        <input type="text" />
                    </div>
                </li>
                <li>
                    <label htmlFor="">등록일</label>
                    <div>
                        <p>등록일</p>
                    </div>
                </li>
                <li>
                    <label htmlFor="">상태</label>
                    <div>
                        <input type="radio" />
                        <label htmlFor="">노출</label>
                        <input type="radio" />
                        <label htmlFor="">숨김</label>
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

