import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, postApi } from '../../api/api';
import Popup from '../../components/Popup';

export default function UserDetail() {
    const { id } = useParams();
    const [data, setDate] = useState();
    const [memo, setMemo] = useState();
    const [popup, setPopup] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        getApi('users/detail', { id })
            .then(({ result, state, data }) => {
                if(result && state){
                    setDate(data)
                    setMemo(data.memo)
                }else{
                    navigate('/admin/user')
                }
            })
    }, [id, navigate])


    const update = (name, value) => {
        postApi('users/update', {id, [name]: value})
            .then(({ result, state, message }) => {
                if(result && state){
                    setPopup({
                        title: '안내',
                        description: message,
                    })
                }
            })
    }

    const resetPasswrod = () => {
        setPopup({
            type: 'check',
            title: '안내',
            description: '비밀번호를 재발급 하시겠습니까?',
            func: () => {
                postApi('users/resetPassword', {id})
                    .then(({ result, state, message }) => {
                        if(result && state){
                            setPopup({
                                title: '안내',
                                description: message,
                            })
                        }
                    })
            }
        })

    }

    return (
        <>
            <ul className='detail-list'>
                <li>
                    <label htmlFor="id">회원번호</label>
                    <div>
                        <input 
                            type="text"
                            id='id'
                            name='id'
                            value={id}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="userId">아이디</label>
                    <div>
                        <input 
                            type="text"
                            id='userId'
                            name='userId'
                            value={data?.userId || ''}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="author">닉네임</label>
                    <div>
                        <input 
                            type="text"
                            id='author'
                            name='author'
                            value={data?.author || ''}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="mobile">휴대폰번호</label>
                    <div>
                        <input 
                            type="text"
                            id='mobile'
                            name='mobile'
                            value={data?.mobile || ''}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="created">가입일</label>
                    <div>
                        <input 
                            type="text"
                            id='created'
                            name='created'
                            value={data?.created || ''}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="lastLogin">최종로그인</label>
                    <div>
                        <input 
                            type="text"
                            id='lastLogin'
                            name='lastLogin'
                            value={data?.lastLogin || ''}
                            readOnly
                        />
                    </div>
                </li>
                <li>
                    <label htmlFor="type">회원 타입</label>
                    <div>
                        {data && 
                            <>
                                <input 
                                    type="radio" 
                                    name="type"
                                    id="type_free"
                                    value="free"
                                    defaultChecked={data?.type === 'free'}
                                    onChange={()=>update('type', 'free')}
                                    required
                                />
                                <label htmlFor="type_free">무료</label>
                                <input 
                                    type="radio" 
                                    name="type"
                                    id="type_vip"
                                    value="vip"
                                    defaultChecked={data?.type === 'vip'}
                                    onChange={()=>update('type', 'vip')}
                                    required
                                />
                            </>
                        }
                        <label htmlFor="type_vip">VIP</label>
                    </div>
                </li>
                <li>
                    <label htmlFor="memo">메모</label>
                    <div>
                        {data && 
                            <textarea 
                                name="memo"
                                id="memo"
                                defaultValue={data?.memo}
                                onChange={(e)=>setMemo(e.target.value)}
                            >
                            </textarea>
                        }
                        <button className='btn-bg-small' onClick={()=>update('memo', memo)}>수정</button>
                    </div>
                </li>
                <li>
                    <label htmlFor="">비밀번호 재발급</label>
                    <div>
                        <button className='btn-bg-small' onClick={resetPasswrod}>비밀번호 재발급</button>
                        <small>* 초기화 비밀번호는 회원의 아이디와 동일하게 설정됩니다.</small>
                    </div>
                </li>
            </ul>
            {popup &&
                <Popup popup={popup} setPopup={setPopup} />
            }
        </>
    );
}

