import React, { useEffect, useRef } from 'react';

export default function Popup({ popup, setPopup, children }) {
    const popupRef = useRef();
    const func = Object.values(popup).filter((value) => typeof(value) === 'function')[0]
    
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

    const onClick = () => {
        func()
    }
    return (
        <div popover="auto" id="my-popover" ref={popupRef}>
            <strong>{popup.title}</strong>
            <p>{popup.description}</p>
            {popup.password && <input type="password" />}
            <div>
                <button popovertarget="my-popover" popovertargetaction="hidden" onClick={() => func && onClick()}>확인</button>
            </div>
        </div>
    );
}

