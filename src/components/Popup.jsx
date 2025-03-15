import React, { useEffect, useRef } from 'react';

const messageType = {
    lock: {
        title: '안내',
        description: '작성자 본인만 열람할 수 있습니다.'
    }
}

export default function Popup({ popup, setPopup, children }) {
    const popupRef = useRef();
    const func = Object.values(popup).filter((value) => typeof(value) === 'function')[0]
    const message = {...messageType[popup.type]}

    useEffect(()=>{
        popupRef.current.showPopover();
        const popupEvent = () => {
            if (popupRef.current.matches(':popover-open')) {

            }else{
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
                <button popovertarget="my-popover" popovertargetaction="hidden">확인</button>
            </div>
        </div>
    );
}

