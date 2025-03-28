import React, { useEffect, useRef } from 'react';

const messageType = {
    lock: {
        title: '안내',
        description: '작성자 본인만 열람할 수 있습니다.'
    }
}

export default function Popup({ popup, setPopup }) {
    const popupRef = useRef();
    // const func = Object.values(popup).filter((value) => typeof(value) === 'function')[0]
    // console.log(popup);
    console.log(popup.title);
    
    const message = !!popup.type ? 
                    {...messageType[popup.type]} :
                    {
                        title : popup.title,
                        description: popup.description
                    }
    console.log(message);
    
    useEffect(()=>{
        popupRef.current.showPopover();
        const popupEvent = () => {
            if (popupRef.current.matches(':popover-open')) {
                
            }else{
                popup.func && popup.func()
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

