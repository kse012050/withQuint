import React, { useEffect, useState } from 'react';
import { inputsRequiredAdd, inputChange, inputErrCheck } from '../api/validation.js';

const errorMessage = {
    id: '영문 또는 영문/숫자 조합하여 4~20자리',
    pw: '영문/숫자/특수문자 조합하여 8~20자리',
    nickName: '',
    mobile: ''
}

const checkInputChange = (e, setInputs, setCheckInputs) =>{
    const { name, dataset: { resetName } } = e.target;
    setInputs(prev => {
        const obj = {...prev};
        if(obj[resetName]){
            document.querySelector(`[name="${resetName}"]`).classList.add('error');
        }
        if(obj[resetName || name]){
            obj[resetName || name] = '';
        }
        return obj;
    });
    inputChange(e, setCheckInputs)
}

export default function SignUp() {
    const [inputs, setInputs] = useState();
    const [checkInputs, setCheckInputs] = useState();
    
    useEffect(()=>{
        inputsRequiredAdd(setInputs)
    },[])

    const onCheck = (type) =>{
        fetch('http://localhost:8001/user/check',{
            method: 'POST',
            // redirect: 'follow',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                type: type,
                value: checkInputs[type]
            })
            // body: {test: 'test'}
        })
        .then((response) => response.json())
        .then(({result, message}) => {
            if(result){
                setInputs((input)=>({...input, [type]: checkInputs[type]}))
            }
        })
        .catch((error) => console.error(error));

    }

    const onSubmit = () =>{
        console.log(inputs);
        console.log(checkInputs);
        
        // fetch('http://localhost:8001/user',{
        //     method: 'POST',
        //     // redirect: 'follow',
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(inputs)
        //     // body: {test: 'test'}
        // })
        // .then((response) => response.json())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));
    }

    return (
        <>
            <h2>회원가입</h2>
            <form onClick={(e)=> e.preventDefault()}>
                <fieldset>
                    <legend>회원가입</legend>
                    <ul>
                        <li>
                            <label htmlFor="userId">아이디</label>
                            <div data-err-essage="영문 또는 영문/숫자 조합하여 4~20자리만 가능합니다.">
                                <input 
                                    type="text"
                                    placeholder='영문 또는 영문/숫자 조합하여 4~20자리'
                                    name='userId'
                                    id='userId'
                                    data-formet='id'
                                    data-validation='id'
                                    onChange={(e)=>checkInputChange(e, setInputs, setCheckInputs)}
                                    onBlur={(e)=>inputErrCheck(e)}
                                    required
                                />
                                {!inputs?.userId && checkInputs?.userId && <button onClick={()=>onCheck('userId')}>중복 확인</button>}
                            </div>
                        </li>
                        <li>
                            <label htmlFor="checkPW">비밀번호</label>
                            <div data-err-essage="영문/숫자/특수문자 조합하여 8~20자리만 가능합니다.">
                                <input type="text"
                                placeholder='영문/숫자/특수문자 조합하여 8~20자리'
                                name='checkPW'
                                id='checkPW'
                                data-formet='pw'
                                data-validation='pw'
                                data-reset-name="password"
                                onChange={(e)=>checkInputChange(e, setInputs, setCheckInputs)}
                                onBlur={(e)=>inputErrCheck(e)}
                                required
                            />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="password">비밀번호 확인</label>
                            <div data-err-essage="비밀번호가 다릅니다.">
                                <input
                                    type="text"
                                    name='password'
                                    id='password'
                                    data-validation='checkPW'
                                    onChange={(e)=>inputChange(e, setInputs, checkInputs?.checkPW)}
                                    onBlur={(e)=>inputErrCheck(e)}
                                    required
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="nickname">닉네임 (특수문자 제외)</label>
                            <div data-err-essage="특수문자는 사용할 수 없습니다.">
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
                                {!inputs?.nickname && checkInputs?.nickname && <button onClick={()=>onCheck('nickname')}>중복 확인</button>}
                            </div>
                        </li>
                        <li>
                            <label htmlFor="mobile">휴대폰 번호</label>
                            <div data-err-essage="휴대폰 번호를 확인해주세요.">
                                <input 
                                    type="text"
                                    name='mobile'
                                    id='mobile'
                                    data-formet='numb'
                                    data-validation='mobile'
                                    maxLength='11'
                                    onChange={(e)=>inputChange(e, setCheckInputs)}
                                    onBlur={(e)=>inputErrCheck(e)}
                                    required
                                />
                            </div>
                        </li>
                    </ul>
                    <div>

                    </div>
                    <input type="submit" value="회원가입" onClick={onSubmit}/>
                </fieldset>
            </form>
        </>
    );
}

