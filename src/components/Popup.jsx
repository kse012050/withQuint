import React from 'react';

export default function Popup({ popup, setPopup }) {

    const onPopupClose = () => {
        setPopup('')
    }

    return (
        <div className='popup' onClick={onPopupClose}>
            <div onClick={(e)=>e.stopPropagation()}>
                <strong>{popup.title}</strong>
                <p>{popup.description}</p>
                <div>
                    <button onClick={onPopupClose}>확인</button>
                </div>
            </div>
        </div>
    );
}

