import React, { useContext, useEffect, useState } from 'react';
import { inputsRequiredAdd, inputChange, checkInputChange, inputErrCheck } from '../api/validation.js';
import { postApi, isSubmit } from '../api/api.js';
import Popup from '../components/Popup.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { useNavigate } from 'react-router-dom';
import MobileAuthentication from '../components/MobileAuthentication.jsx';

// const errorMessage = {
//     id: '영문 또는 영문/숫자 조합하여 4~20자리',
//     pw: '영문/숫자/특수문자 조합하여 8~20자리',
//     nickName: '',
//     mobile: ''
// }


export default function SignUp() {
    const [inputs, setInputs] = useState();
    const [checkInputs, setCheckInputs] = useState();
    const { user } = useContext(ThemeContext)
    const [popup, setPopup] = useState();
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(user){
            navigate('/')
        }
        inputsRequiredAdd(setInputs)
    },[navigate, user])

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

    const agreeCheck = () =>{
        setInputs((prev)=>({...prev, termsOfService: 'y', privacyPolicy: 'y'}))
    }

    const onSubmit = (e) =>{
        e.preventDefault();

        if(isSubmit(inputs)){
            return;
        }
        
        const data = {...inputs};
        delete data.checkPW;

        postApi('signUp', data)
            .then(( response )=>{
                const { result, /* message */ } = response || {};
                console.log(response);
                
                if(result){
                    navigate('/signIn')
                }
            })
    }

    return (
        <>
            <div>
                <form>
                    <fieldset>
                        <legend>회원가입</legend>
                        <ul>
                            <li>
                                <label htmlFor="userId">아이디</label>
                                <div 
                                    data-err-message={
                                        checkInputs?.userId ?
                                            `아이디 중복 확인을 해주세요.` :
                                            `영문 또는 영문/숫자 조합하여 4~20자리만 가능합니다.`
                                    }
                                >
                                    <input 
                                        type="text"
                                        placeholder='영문 또는 영문/숫자 조합하여 4~20자리'
                                        name='userId'
                                        id='userId'
                                        data-formet='id'
                                        data-validation='id'
                                        onChange={(e)=>checkInputChange(e, setInputs, setCheckInputs)}
                                        onBlur={(e)=>inputErrCheck(e)}
                                        autoComplete="off" 
                                        required
                                    />
                                    {!inputs?.userId && checkInputs?.userId && <button onClick={()=>onCheck('userId')} type="button">중복 확인</button>}
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
                                        data-formet='password'
                                        data-validation='password'
                                        data-reset-name="password"
                                        onChange={(e)=>inputChange(e, setInputs)}
                                        onBlur={(e)=>inputErrCheck(e)}
                                        autoComplete="off" 
                                        required
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
                                        onBlur={(e)=>inputErrCheck(e)}
                                        autoComplete="off" 
                                        required
                                    />
                                </div>
                            </li>
                            <li>
                                <label htmlFor="nickname">닉네임 (특수문자 제외)</label>
                                <div
                                    data-err-message={
                                        checkInputs?.userId ?
                                            `닉네임 중복 확인을 해주세요.` :
                                            `특수문자는 사용할 수 없습니다.`
                                    } 
                                >
                                    <input
                                        type="text"
                                        name='nickname'
                                        id='nickname'
                                        data-formet='nickname'
                                        data-validation='nickname'
                                        onChange={(e)=>checkInputChange(e, setInputs, setCheckInputs)}
                                        onBlur={(e)=>inputErrCheck(e)}
                                        required
                                    />
                                    {!inputs?.nickname && checkInputs?.nickname && <button onClick={()=>onCheck('nickname')} type="button">중복 확인</button>}
                                </div>
                            </li>
                            <li>
                                <label htmlFor="mobile">휴대폰 번호</label>
                                <MobileAuthentication type="signUp" inputs={inputs} setInputs={setInputs} />
                            </li>
                        </ul>
                        <div>
                            <input 
                                type="checkbox"
                                id='agreeAll'
                                checked={inputs?.termsOfService === 'y' && inputs?.privacyPolicy === 'y'}
                                onChange={agreeCheck}
                            />
                            <label htmlFor="agreeAll">이용약관 전체 동의</label>
                            <input 
                                type="checkbox"
                                id='termsOfService'
                                name='termsOfService'
                                checked={inputs?.termsOfService === 'y'}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                            <label htmlFor="termsOfService"><span>[필수]</span> 서비스 이용약관 보기</label>
                            <input 
                                type="checkbox"
                                id='privacyPolicy'
                                name='privacyPolicy'
                                checked={inputs?.privacyPolicy === 'y'}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                            <label htmlFor="privacyPolicy"><span>[필수]</span> 개인정보처리방침 보기</label>
                        </div>
                        <input type="submit" className='btn-bg-big' value="회원가입" onClick={onSubmit}/>
                    </fieldset>
                </form>
                {popup && <Popup popup={popup} setPopup={setPopup}/>}
            </div>
        </>

    );
}

