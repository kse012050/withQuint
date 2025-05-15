import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { inputChange, inputsRequiredAdd } from '../api/validation';
import { isSubmit, postApi } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';
import Popup from '../components/Popup';

export default function SignIn() {
    const [inputs, setInputs] = useState({userId: localStorage.getItem('userId'), authLogin: localStorage.getItem('userId') ? 'y': 'n'})
    const { user, setUser } = useContext(ThemeContext)
    const [popup, setPopup] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(user){
            navigate('/')
        }
        inputsRequiredAdd(setInputs)
    },[navigate, user])

    const onSubmit = (e) => {
        e.preventDefault();

        if(isSubmit(inputs)){
            return;
        }

        postApi('signIn', inputs)
            .then(({ result, state, message, user } = {})=>{
                if(result){
                    if(state){
                        setUser(user)
                        sessionStorage.setItem("user", JSON.stringify(user));
                        if(inputs.authLogin === 'y'){
                            localStorage.setItem("userId", user.userId);
                        }else{
                            localStorage.removeItem("userId");
                        }
                    }else{
                        setPopup({
                            title: '안내',
                            description: message,
                        })
                    }
                }
            })
    }

    return (
        <>
            <div>
                <form>
                    <fieldset>
                        <ul>
                            <li>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='아이디 입력'
                                        name='userId'
                                        id='userId'
                                        data-formet='id'
                                        data-validation='id'
                                        onChange={(e)=>inputChange(e, setInputs)}
                                        defaultValue={inputs?.userId}
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
                                        onChange={(e)=>setInputs((input) => ({...input, password: e.target.value}))}
                                        autoComplete="off" 
                                        required
                                    />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <input type="checkbox" name='authLogin' id='authLogin' defaultChecked={inputs?.authLogin === 'y'} onChange={(e)=>inputChange(e, setInputs)}/>
                            <label htmlFor="authLogin">자동 로그인</label>
                        </div>
                        <input type="submit" className='btn-bg-big' value="로그인" onClick={onSubmit}/>
                        <p>아이디 또는 비밀번호가 일치하지 않습니다</p>
                    </fieldset>
                </form>
                <strong>로그인 정보를 잊으셨나요?</strong>
                <Link to='' className='btn-bg-big'>아이디/비밀번호 찾기</Link>
                <strong>회원이 아니신가요?</strong>
                <Link to='' className='btn-border-big'>회원가입</Link>
                {popup &&
                    <Popup popup={popup} setPopup={setPopup} />
                }
            </div>
        </>
    );
}

