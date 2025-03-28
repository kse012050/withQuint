import React, { useEffect, useRef } from 'react';

const messageType = {
    lock: {
        title: '안내',
        description: '작성자 본인만 열람할 수 있습니다.'
    }
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

