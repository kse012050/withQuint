import React, { useState } from 'react';

export default function SelectBox({ type, setSearch }) {
    const list = {'free':'무료', 'vip':'VIP'};
    const [active, setActive] = useState(false);

    const onSelect = (type) => {
        setActive(false);
        setSearch((search)=>{
           return {...search, type}
        })
    }

    return (
        <div className='selectBox'>
            <button onClick={()=>setActive(true)} className={type ? 'active' : ''}>{list[type] || '분류 전체'}</button>
            {active &&
                <div>
                    {Object.entries(list).map(([key, value], idx)=> 
                        <button key={idx} onClick={()=>onSelect(key)}>{ value }</button>
                    )}
                </div>
            }
        </div>
    );
}

