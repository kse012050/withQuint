import React, { useEffect, useRef } from 'react';

const messageType = {
    lock: {
        title: '안내',
        description: '작성자 본인만 열람할 수 있습니다.'
    },
    failSignIn: {
        title: '안내',
        description: '아이디 또는 비밀번호를 다시 한 번 확인해주세요.'
    },
    failServer: {
        title: '안내',
        description: `서버에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
                        문제가 계속될 경우, 고객센터로 문의해주시기 바랍니다.
                        고객센터 1234-5678
                    `
    },
}

export default function Popup({ popup, setPopup }) {
    const popupRef = useRef();
    
    const message = !popup.title ? 
                    {...messageType[popup.type]} :
                    {
                        title : popup.title,
                        description: popup.description
                    }
    
    useEffect(()=>{
        popupRef.current.showPopover();
        const popupEvent = () => {
            if(!popupRef.current.matches(':popover-open')){
                (popup.func && popup.type !== 'check') ? 
                    popup.func() :
                    setPopup()
            }
        }
        popupRef.current.addEventListener('toggle', popupEvent)
    },[popup, setPopup])

    return (
        <div popover="auto" id="my-popover" ref={popupRef}>
            <strong>{message.title}</strong>
            <p>{message.description}</p>
            <div>
                {popup.type === 'check' ?
                <>
                    <button onClick={()=> setPopup()}>취소</button>
                    <button onClick={popup.func}>확인</button>
                </> :
                    <button popovertarget="my-popover" popovertargetaction="hidden">확인</button>
                }
            </div>
        </div>
    );
}

