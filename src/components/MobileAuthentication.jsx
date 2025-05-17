import React, { useEffect, useState } from 'react';
import { inputChange } from '../api/validation';
import { postApi } from '../api/api';
import Popup from './Popup';

export default function MobileAuthentication(inputs, setInputs) {
    const [phoneAuth, setPhoneAuth] = useState()
    const [isPhoneNum, setIsPhoneNum] = useState(false)
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);
    const [popup, setPopup] = useState();

    const onAuthSend = () => {
        postApi('signUp/mobileAuthSend', {mobile: phoneAuth.mobile})
            .then(({ result, state, message } = {})=>{
                if(result && state){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            setIsPhoneNum(true)
                            setTimeLeft(10)
                        }
                    })
                }
            })
    }

      const startTimer = () => {
        if (timerRef.current) return; // 이미 실행 중이면 중복 방지

        timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(timerRef.current);
                timerRef.current = null;
                return 0;
            }
            return prev - 1;
        });
        }, 1000);
    };

    // 시간 형식 (mm:ss)
    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    const onAuthCheck = () => {
        postApi('signUp/mobileAuthCheck', {...phoneAuth})
            .then(({ result, state, message } = {})=>{
                if(result && state){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => {
                            setIsPhoneNum(true)
                        }
                    })
                }
            })
    }

    return (
        <>
            <div data-err-message="휴대폰 번호를 확인해주세요.">
                <input 
                    type="text"
                    name='mobile'
                    id='mobile'
                    data-formet='numb'
                    data-validation='mobile'
                    maxLength='11'
                    onChange={(e)=>{
                        setIsPhoneNum(false)
                        inputChange(e, setPhoneAuth)
                    }}
                    required
                />
                {phoneAuth?.mobile &&
                    <button 
                        type="button"
                        onClick={onAuthSend}
                    >
                        { !isPhoneNum ? '인증' : '재전송' }
                    </button>
                }
            </div>
            {isPhoneNum &&
                <div data-err-message="인증번호를 확인해주세요.">
                    <input 
                        type="text"
                        name='mobileAuth'
                        id='mobileAuth'
                        data-formet='numb'
                        data-validation='mobileConfirm'
                        maxLength='6'
                        onChange={(e)=>inputChange(e, setPhoneAuth)}
                        // onBlur={(e)=>inputErrCheck(e)}
                        required
                    />
                    {phoneAuth?.mobileAuth &&
                        <button 
                            type="button"
                            onClick={onAuthCheck}
                        >
                            확인
                        </button>
                    }
                    {formatTime(timeLeft)}
                </div>
            }
            {popup && <Popup popup={popup} setPopup={setPopup}/>}
        </>
    );
}

