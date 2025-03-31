import React, { useState } from 'react';
import { inputChange } from '../../api/validation';
import { postApi } from '../../api/api';

export default function SignIn() {
    const [inputs, setInputs] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        postApi('signIn', inputs)
            .then((result) => {
                console.log(result);
                
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
                                />
                            </div>
                        </li>
                    </ul>
                    <input type="submit" className='btn-bg-big' value="로그인" onClick={onSubmit}/>
                </form>
            </div>
        </>
    );
}

