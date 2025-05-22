import React, { useEffect, useRef, useState } from 'react';
import { inputChange } from '../api/validation';
import { postApi } from '../api/api';
import Popup from './Popup';

export default function MobileAuthentication({ type, inputs, setInputs, currentValue, placeholder }) {
    const [phoneAuth, setPhoneAuth] = useState()
    const [isPhoneNum, setIsPhoneNum] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);
    const mobileRef = useRef(null);
    const authRef = useRef(null);
    const [popup, setPopup] = useState();

    const onAuthSend = () => {
        postApi(`mobileAuth/send`, {type, mobile: phoneAuth.mobile})
            .then(({ result, state, message } = {})=>{
                if(result){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            if(state){
                                setIsPhoneNum(true)
                            }else{
                                mobileRef.current.focus()
                            }
                        }
                    })
                }
            })
    }

    useEffect(()=> {
        if(isPhoneNum){
            mobileRef.current.classList.remove('error')
            authRef.current.focus()
            setTimeLeft(180)
            startTimer()
        }
    }, [isPhoneNum])

    const startTimer = () => {
        if (timerRef.current) return; // 이미 실행 중이면 중복 방지

        timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(timerRef.current);
                timerRef.current = null;
                setIsPhoneNum(false)
                mobileRef.current.focus()
                return false;
            }
            return prev - 1;
        });
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsPhoneNum(false)
    }

    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    const onAuthCheck = () => {
        postApi(`mobileAuth/check`, {type, ...phoneAuth})
            .then(({ result, state, message } = {})=>{
                if(result){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            if(state){
                                stopTimer()
                                setInputs((prev)=>({...prev, mobile: phoneAuth.mobile}))
                                mobileRef.current.classList.remove('error')
                            }else{
                                authRef.current.focus()
                            }
                        }
                    })
                }
            })
    }

    return (
        <>
            <div data-err-message={!phoneAuth?.mobile ? '휴대폰 번호를 확인해주세요.' : '휴대폰 인증을 진행주세요.'}>
                <input 
                    type="text"
                    name='mobile'
                    id='mobile'
                    data-formet='numb'
                    data-validation='mobile'
                    maxLength='11'
                    ref={mobileRef}
                    onChange={(e)=>{
                        timerRef.current && stopTimer()
                        inputs?.mobile && setInputs((prev)=>({...prev, mobile: ''}))
                        inputChange(e, setPhoneAuth)
                    }}
                    defaultValue={currentValue}
                    placeholder={placeholder && '휴대폰 번호 입력'}
                    required
                />
                {phoneAuth?.mobile && !inputs?.mobile &&
                    <button 
                        type="button"
                        onClick={onAuthSend}
                    >
                        { !isPhoneNum ? '인증' : '재전송' }
                    </button>
                }
                { inputs?.mobile && <p>인증이 완료되었습니다.</p> }
            </div>
            {isPhoneNum && !inputs?.mobile &&
                <div data-err-message="인증번호를 확인해주세요.">
                    <input 
                        type="text"
                        name='mobileAuth'
                        id='mobileAuth'
                        data-formet='numb'
                        data-validation='mobileConfirm'
                        maxLength='6'
                        ref={authRef}
                        onChange={(e)=>inputChange(e, setPhoneAuth)}
                        placeholder={placeholder && '인증번호 입력'}
                        required
                    />
                    <div>
                        {timeLeft &&
                            <time>
                                {formatTime(timeLeft)}
                            </time>
                        }
                        {phoneAuth?.mobileAuth &&
                            <button 
                                type="button"
                                onClick={onAuthCheck}
                            >
                                확인
                            </button>
                        }
                    </div>
                </div>
            }
            {popup && <Popup popup={popup} setPopup={setPopup}/>}
        </>
    );
}

