import React, { useEffect, useState } from 'react';
import { inputChange, inputsRequiredAdd } from '../../api/validation';
import { getApi, isSubmit, postApi } from '../../api/api';
import Popup from '../../components/Popup';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [inputs, setInputs] = useState();
    const [popup, setPopup] = useState();
    const navigate = useNavigate()

    useEffect(()=>{
        inputsRequiredAdd(setInputs)

        getApi('admin/auth')
            .then(({ result, state })=>{
                if(result && state){
                    navigate('dashboard')
                }
            })
    },[navigate])

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(isSubmit(inputs)){
            return;
        }

        postApi('signIn', inputs)
            .then(({ result, state } = {}) => {
                const messageType = {type: ''}
                
                if(result){
                    if(state){
                        navigate('dashboard')
                    }else{
                        messageType.type = 'failSignIn'
                    }
                }else{
                    messageType.type = 'failServer'
                }
                setPopup(messageType)
            })
    }
    return (
        <>
            <link rel="stylesheet" href="/css/admin/import.css" />
            <div className='signInPage'>
                <form>
                    <h2>웰스 투자 관리자</h2>
                    <ul>
                        <li>
                            <div>
                                <input 
                                    type="text"
                                    placeholder='id'
                                    name="adminId"
                                    onChange={(e)=>inputChange(e, setInputs)}
                                    required
                                />
                            </div>
                        </li>
                        <li>
                            <div>
                                <input 
                                    type="password"
                                    placeholder='password'
                                    name="password"
                                    onChange={(e)=>inputChange(e, setInputs)}
                                    required
                                />
                            </div>
                        </li>
                    </ul>
                    <input type="submit" className='btn-bg-big' value="로그인" onClick={onSubmit}/>
                </form>
                <div className='info'>
                    <dl>
                        <dt>ID</dt>
                        <dd>KimSungEun</dd>
                    </dl>
                    <dl>
                        <dt>PW</dt>
                        <dd>01092931656</dd>
                    </dl>
                </div>
            </div>
            { popup && <Popup popup={popup} setPopup={setPopup}/> }
        </>
    );
}

