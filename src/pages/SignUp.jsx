import React from 'react';

export default function SignUp() {
    return (
        <>
            <h2>회원가입</h2>
            <form>
                <strong>회원가입</strong>
                <fieldset>
                    <legend>회원가입</legend>
                    <ul>
                        <li>
                            <label htmlFor="">아이디</label>
                            <div>
                                <input type="text" />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">비밀번호</label>
                            <div>
                                <input type="text" />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">비밀번호 확인</label>
                            <div>
                                <input type="text" />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">닉네임 (특수문자 제외)</label>
                            <div>
                                <input type="text" />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">휴대폰 번호</label>
                            <div>
                                <input type="text" />
                            </div>
                        </li>
                    </ul>
                </fieldset>
                <fieldset>
                    
                </fieldset>
            </form>
        </>
    );
}

