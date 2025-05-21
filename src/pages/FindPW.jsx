import React, { useEffect, useState } from 'react';
import MobileAuthentication from '../components/MobileAuthentication';
import { inputChange, inputsRequiredAdd } from '../api/validation';
import { isSubmit, postApi } from '../api/api';
import Popup from '../components/Popup';
import { useNavigate } from 'react-router-dom';

export default function FindPW() {
    const [inputs, setInputs] = useState()
    const [userId, setUserId] = useState()
    const [popup, setPopup] = useState()
    const navigate = useNavigate()

    useEffect(()=> {
        inputsRequiredAdd(setInputs)
    }, [userId])

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(isSubmit(inputs)){
            return;
        }

        postApi('find/pw', inputs)
            .then(({ result, state, message, data }) => {
                if(result){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            if(state){
                                setUserId(data.userId)
                            }
                        }
                    })
                }
            })
    }

    const onPWChange = (e) => {
        e.preventDefault();
        
        if(isSubmit(inputs)){
            return;
        }

        postApi('find/pwChange', {userId: userId, password: inputs.password})
            .then(({ result, state, message }) => {
                if(result){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            if(state){
                                navigate('/signIn')
                            }
                        }
                    })
                }
            })
    }

    return (
        <div>
            <form>
                {!userId ?
                    <fieldset>
                        <legend>비밀번호 찾기</legend>
                        <p>아이디와 휴대폰 번호를 입력하세요.</p>
                        <ul>
                            <li>
                                <div>
                                    <input
                                        key='userId'
                                        type="text"
                                        placeholder='아이디 입력'
                                        name='userId'
                                        id='userId'
                                        data-formet='id'
                                        data-validation='id'
                                        onChange={(e)=>inputChange(e, setInputs)}
                                        autoComplete="off" 
                                        required
                                    />
                                </div>
                                <MobileAuthentication type="find" inputs={inputs} setInputs={setInputs} placeholder/>
                            </li>
                        </ul>
                        <input type="submit" className='btn-bg-big' value="확인" onClick={onSubmit}/>
                    </fieldset> :
                    <fieldset>
                        <legend>새 비밀번호 설정</legend>
                        <p>
                            사용하실 새 비밀번호를 입력하세요.<br/>
                            (영문/숫자/특수문자 조합하여 8~20자리)
                        </p>
                        <ul>
                            <li>
                                <div data-err-message={!inputs?.checkPW ? '영문/숫자/특수문자 조합하여 8~20자리만 가능합니다.' : '비밀번호가 일치하지 않습니다.'}>
                                    <input 
                                        key='pw'
                                        type="password"
                                        placeholder='새 비밀번호 입력'
                                        name='checkPW'
                                        id='checkPW'
                                        data-formet='password'
                                        data-validation='password'
                                        data-reset-name="password"
                                        onChange={(e)=>inputChange(e, setInputs)}
                                        autoComplete="off" 
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder='새 비밀번호 확인'
                                        name='password'
                                        id='password'
                                        data-validation='checkPW'
                                        onChange={(e)=>inputChange(e, setInputs, inputs?.checkPW)}
                                        autoComplete="off" 
                                        required
                                    />
                                </div>
                            </li>
                        </ul>
                        <input type="submit" className='btn-bg-big' value="비밀번호 변경" onClick={onPWChange}/>
                    </fieldset>
                }
            </form>
            {popup && <Popup popup={popup} setPopup={setPopup}/>}
        </div>
    );
}

