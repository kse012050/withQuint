import React from 'react';

export default function SignUp() {
    return (
        <>
            <h2>회원가입</h2>
            <form>
                <fieldset>
                    <legend>회원가입</legend>
                    <ul>
                        <li>
                            <label htmlFor="">아이디</label>
                            <div>
                                <input type="text" placeholder='영문 또는 영문/숫자 조합하여 4~20자리' required/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">비밀번호</label>
                            <div>
                                <input type="text" placeholder='영문/숫자/특수문자 조합하여 8~20자리' required/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">비밀번호 확인</label>
                            <div>
                                <input type="text" required/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">닉네임 (특수문자 제외)</label>
                            <div>
                                <input type="text" required/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">휴대폰 번호</label>
                            <div>
                                <input type="text" required/>
                            </div>
                        </li>
                    </ul>
                    <div>

                    </div>
                    <input type="submit" value="회원가입" />
                </fieldset>
            </form>
        </>
    );
}

