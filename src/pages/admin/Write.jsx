import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getApi } from '../../api/api';

export default function Write() {
    const { id, boardType } = useParams();
    const [inputs, setInputs] = useState()

    useEffect(()=>{
        console.log(id);
        console.log(boardType);
        if(!id) return;
        getApi('boards/detail', {boardId: id, boardType})
            .then(({ result, data } = {} )=>{
                if(result){
                    console.log(data);
                    
                }
            })
    }, [])

    return (
        <>
            <ul className='detail-list'>
                { id &&
                    <li>
                        <label htmlFor="">No.</label>
                        <div>
                            <input type="text" defaultValue={id} readOnly/>
                        </div>
                    </li>
                }
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
                    <label htmlFor="">타입</label>
                    <div>
                        <input type="radio" />
                        <label htmlFor="">무료</label>
                        <input type="radio" />
                        <label htmlFor="">VIP</label>
                    </div>
                </li>
                { id &&
                    <li>
                        <label htmlFor="">등록일</label>
                        <div>
                            <input type="text" defaultValue={id} readOnly/>
                        </div>
                    </li>
                }
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
            <div className='detail-update'>
                { id ? 
                    <>
                        <Link to='' className='btn-gray'>목록</Link>
                        <button className='btn-bg-small'>수정</button>
                    </>
                    :
                    <button className='btn-bg-small'>생성</button>
                }
            </div>
        </>
    );
}

