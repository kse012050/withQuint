import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputChange, inputsRequiredAdd } from '../api/validation';
import { isSubmit, postApi } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';

export default function SignIn() {
    const [inputs, setInputs] = useState()
    const { isLogin, setIsLogin } = useContext(ThemeContext)
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLogin){
            navigate('/')
        }
        inputsRequiredAdd(setInputs)
    },[navigate, isLogin])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);

        if(isSubmit(inputs)){
            return;
        }
        postApi('signIn', inputs)
            .then(( response )=>{
                const { result/* , message */ } = response || {};
                // console.log(result);
                // console.log(message);
                if(result){
                    setIsLogin(true)
                    // console.log(result);
                    // console.log(message);
                }
            })
    }

    

    const test = () =>{
        postApi('test', inputs)
            .then(({ result, message })=>{
                console.log(result);
                console.log(message);
                if(result){
                    console.log(result);
                    console.log(message);
                }
            })
    }

    return (
        <>
            <h2 onClick={test}>로그인</h2>   
            <div>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <div>
                                    <input
                                        type="password"
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
                                <div>
                                    <input
                                        type="password"
                                        placeholder='비밀번호 입력'
                                        name='password'
                                        id='password'
                                        data-formet='password'
                                        data-validation='password'
                                        onChange={(e)=>inputChange(e, setInputs)}
                                        autoComplete="off" 
                                        required
                                    />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <input type="checkbox" name='authLogin' id='authLogin' onChange={(e)=>inputChange(e, setInputs)}/>
                            <label htmlFor="authLogin">자동 로그인</label>
                        </div>
                        <input type="submit" className='btn-bg' value="로그인" onClick={onSubmit}/>
                        <p>아이디 또는 비밀번호가 일치하지 않습니다</p>
                    </fieldset>
                </form>
                <strong>로그인 정보를 잊으셨나요?</strong>
                <Link to='' className='btn-bg'>아이디/비밀번호 찾기</Link>
                <strong>회원이 아니신가요?</strong>
                <Link to='' className='btn-border'>회원가입</Link>
            </div>
        </>
    );
}

