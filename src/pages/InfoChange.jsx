import React, { useEffect, useState } from 'react';
import MobileAuthentication from '../components/MobileAuthentication';
import { getApi, isSubmit, postApi } from '../api/api';
import { checkInputChange, inputChange/* , inputsRequiredAdd */ } from '../api/validation';
import Popup from '../components/Popup';

export const INFO_UPDATE_ENDPOINT = 'info/update';

export const createInfoChangePayload = (inputs = {}, currentInputs = {}) => {
    const payload = {};

    if (inputs.password) {
        payload.password = inputs.password;
    }

    if (inputs.nickname && inputs.nickname !== currentInputs.nickname) {
        payload.nickname = inputs.nickname;
    }

    if (inputs.mobile && inputs.mobile !== currentInputs.mobile) {
        payload.mobile = inputs.mobile;
    }

    return payload;
}

export default function InfoChange() {
    const [inputs, setInputs] = useState();
    const [currentInputs, setCurrentInputs] = useState();
    const [checkInputs, setCheckInputs] = useState();
    const [popup, setPopup] = useState();
    const [resetKey, setResetKey] = useState(0);

    useEffect(()=> {
        getApi('info')
            .then((res) => {
                if(!res?.data){
                    setPopup({
                        title: '안내',
                        description: '회원 정보를 불러오지 못했습니다.'
                    })
                    return;
                }

                setCurrentInputs(res.data)
                setInputs({
                    mobile: res.data.mobile,
                })
            })
    }, [])

    const onCheck = (type) =>{
        postApi('signUp/check', {
            type: type,
            value: checkInputs[type]
        }).then(({ result, state, message } = {})=>{
            if(result){
                state && setInputs((input)=>({...input, [type]: checkInputs[type]}))
                setPopup({
                    title: '안내',
                    description: message
                })
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(isSubmit(inputs)){
            return;
        }

        if(inputs?.checkPW && !inputs?.password){
            const passwordSelector = document.querySelector('[name="password"]');
            passwordSelector?.classList.add('error');
            passwordSelector?.focus();
            return;
        }

        if(checkInputs?.nickname && checkInputs.nickname !== currentInputs?.nickname && !inputs?.nickname){
            setPopup({
                title: '안내',
                description: '닉네임 중복 확인을 해주세요.'
            })
            return;
        }

        const data = createInfoChangePayload(inputs, currentInputs);

        if(!Object.keys(data).length){
            setPopup({
                title: '안내',
                description: '변경된 정보가 없습니다.'
            })
            return;
        }

        postApi(INFO_UPDATE_ENDPOINT, data)
            .then(({ result, state, message } = {}) => {
                console.log(result);
                console.log(state);
                console.log(message);
                
                setPopup({
                    title: '안내',
                    description: message || (state ? '정보가 변경되었습니다.' : '정보 변경에 실패했습니다.'),
                    func: () => {
                        if(result && state){
                            setCurrentInputs((currentInput)=>({...currentInput, ...data}));
                            setInputs((input)=>({mobile: data.mobile || input?.mobile || currentInputs?.mobile}));
                            setCheckInputs(undefined);
                            setResetKey((key)=>key + 1);
                        }
                    }
                })
            })
        
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="">아이디</label>
                            <div>
                                <input 
                                    type="text"
                                    defaultValue={currentInputs?.userId}
                                    readOnly
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="checkPW">비밀번호</label>
                            <div data-err-message="영문/숫자/특수문자 조합하여 8~20자리만 가능합니다.">
                                <input 
                                    type="password"
                                    placeholder='영문/숫자/특수문자 조합하여 8~20자리'
                                    name='checkPW'
                                    id='checkPW'
                                    key={`checkPW-${resetKey}`}
                                    data-formet='password'
                                    data-validation='password'
                                    data-reset-name="password"
                                    onChange={(e)=>{
                                        if(e.target.value){
                                            inputChange(e, setInputs)
                                            setInputs((input)=> ({...input, password: ''}) )
                                        }else{
                                            e.target.classList.remove('error')
                                            setInputs((input) => {
                                                const { password, checkPW, ...rest } = input;
                                                return rest;
                                            });
                                        }
                                    }}
                                    autoComplete="off" 
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="password">비밀번호 확인</label>
                            <div data-err-message="비밀번호가 다릅니다.">
                                <input
                                    type="password"
                                    name='password'
                                    id='password'
                                    data-validation='checkPW'
                                    onChange={(e)=>inputChange(e, setInputs, inputs?.checkPW)}
                                    key={`password-${resetKey}-${inputs?.checkPW || ''}`}
                                    autoComplete="off"
                                    disabled={!inputs?.checkPW}
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="nickname">닉네임 (특수문자 제외)</label>
                            <div
                                // data-err-message={
                                //     checkInputs?.userId ?
                                //         `닉네임 중복 확인을 해주세요.` :
                                //         `특수문자는 사용할 수 없습니다.`
                                // } 
                            >
                                <input
                                    type="text"
                                    name='nickname'
                                    id='nickname'
                                    data-formet='nickname'
                                    data-validation='nickname'
                                    defaultValue={currentInputs?.nickname}
                                    onChange={(e)=>{
                                        if(e.target.value === currentInputs?.nickname){
                                            setCheckInputs(undefined);
                                            setInputs((input) => {
                                                const { nickname, ...rest } = input;
                                                return rest;
                                            });
                                        }else{
                                            checkInputChange(e, setInputs, setCheckInputs)
                                        }
                                    }}
                                />
                                {(!inputs?.nickname && checkInputs?.nickname && (currentInputs?.nickname !== checkInputs?.nickname)) && (
                                    <button onClick={()=>onCheck('nickname')} type="button">중복 확인</button>
                                )}
                            </div>
                        </li>
                        <li>
                            <label htmlFor="mobile">휴대폰 번호</label>
                            <MobileAuthentication type="signUp" currentValue={currentInputs?.mobile} inputs={inputs} setInputs={setInputs} />
                        </li>
                    </ul>
                    <input type="submit" className='btn-bg-big' value="정보변경" />
                </fieldset>
            </form>
            {popup && <Popup popup={popup} setPopup={setPopup}/>}
        </div>
    );
}

