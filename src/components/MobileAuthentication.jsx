import React from 'react';

export default function MobileAuthentication(setInputs) {
    return (
        <>
            <div data-err-message="휴대폰 번호를 확인해주세요.">
                <input 
                    type="text"
                    name='mobile'
                    id='mobile'
                    data-formet='numb'
                    data-validation='mobile'
                    maxLength='11'
                    // onChange={(e)=>inputChange(e, setInputs)}
                    // onBlur={(e)=>inputErrCheck(e)}
                    required
                />
                <button>인증</button>
            </div>
            <div data-err-message="휴대폰 번호를 확인해주세요.">
                <input 
                    type="text"
                    name='mobile'
                    id='mobile'
                    data-formet='numb'
                    data-validation='mobile'
                    maxLength='11'
                    // onChange={(e)=>inputChange(e, setInputs)}
                    // onBlur={(e)=>inputErrCheck(e)}
                    required
                />
            </div>
        </>
    );
}

