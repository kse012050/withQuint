import React, { useEffect, useRef } from 'react';

export default function Popup({ popup }) {
    const popupRef = useRef();

    useEffect(()=>{
        // console.log(popupRef?.current?.matches(':popover-open'));
        if (popupRef.current && popup.is) {
            popupRef.current.showPopover();
        }
        // console.log(popupRef.current);
        return () => {
            
        }
    },[popup])
    return (
        <div popover="auto" id="my-popover" ref={popupRef}>
            <strong>{popup.title}</strong>
            <p>{popup.description}</p>
            <div>
                <button popovertarget="my-popover" popovertargetaction="hidden">확인</button>
            </div>
        </div>
    );
}

