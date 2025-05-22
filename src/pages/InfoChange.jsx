import React, { useEffect, useState } from 'react';
import MobileAuthentication from '../components/MobileAuthentication';
import { getApi, isSubmit } from '../api/api';
import { inputChange } from '../api/validation';

export default function InfoChange() {
    const [inputs, setInputs] = useState();
    const [currentInputs, setCurrentInputs] = useState();

    useEffect(()=> {
        getApi('info')
            .then((res) => {
                setCurrentInputs(res.data)
            })
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(currentInputs);
        console.log(inputs);

        if(isSubmit(inputs)){
            return;
        }
        
    }
    return (
        <div>
            <form>
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
                                    data-formet='password'
                                    data-validation='password'
                                    data-reset-name="password"
                                    onChange={(e)=>inputChange(e, setInputs)}
                                    // onBlur={(e)=>inputErrCheck(e)}
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
                                    // onChange={(e)=>inputChange(e, setInputs, inputs?.checkPW)}
                                    // onBlur={(e)=>inputErrCheck(e)}
                                    autoComplete="off" 
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
                                    // onChange={(e)=>checkInputChange(e, setInputs, setCheckInputs)}
                                    // onBlur={(e)=>inputErrCheck(e)}
                                />
                                {/* {!inputs?.nickname && checkInputs?.nickname && <button onClick={()=>onCheck('nickname')} type="button">중복 확인</button>} */}
                            </div>
                        </li>
                        <li>
                            <label htmlFor="mobile">휴대폰 번호</label>
                            <MobileAuthentication type="signUp" currentValue={currentInputs?.mobile} inputs={inputs} setInputs={setInputs} />
                        </li>
                    </ul>
                    <input type="submit" className='btn-bg-big' value="정보변경" onClick={onSubmit}/>
                </fieldset>
            </form>
        </div>
    );
}

