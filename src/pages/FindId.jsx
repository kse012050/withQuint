import React, { useEffect, useState } from 'react';
import MobileAuthentication from '../components/MobileAuthentication';
import { isSubmit, postApi } from '../api/api';
import { inputsRequiredAdd } from '../api/validation';
import { Link } from 'react-router-dom';

export default function FindId() {
    const [inputs, setInputs] = useState()
    const [userId, setUserId] = useState()

    useEffect(()=> {
        inputsRequiredAdd(setInputs)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(isSubmit(inputs)){
            return;
        }

        postApi('find/id', inputs)
            .then(({ result, state, data, message }) => {
                if(result){
                    if(state){
                        setUserId(data.userId)
                    }
                }
            })
    }
    return (
        <div>
            {!userId ?
                <form>
                    <fieldset>
                        <legend>아이디 찾기</legend>
                        <p>회원정보에 저장된 휴대폰 번호를 입력하세요.</p>
                        <ul>
                            <li>
                                <MobileAuthentication type="find" inputs={inputs} setInputs={setInputs} placeholder/>
                            </li>
                        </ul>
                        <input type="submit" className='btn-bg-big' value="아이디 찾기" onClick={onSubmit}/>
                    </fieldset>
                </form> :
                <>
                    <p>
                        가입하신 아이디는<br/>
                        <mark>{userId}</mark> 입니다.
                    </p>
                    <Link to='/signIn' className='btn-bg-big'>로그인</Link>
                </>
            }
        </div>
    );
}

