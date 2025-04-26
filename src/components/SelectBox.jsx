import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectBox({ type, setSearch }) {
    const list = {'free':'무료', 'vip':'VIP'};
    const [active, setActive] = useState(false);
    const navigate = useNavigate();

    const onSelect = (type) => {
        setActive(false);
        setSearch((search)=>{
            navigate('?' + new URLSearchParams({...search, type}))
            return {...search, type}
        })
    }

    useEffect(()=>{
        const bodyClick = () => {
            setActive(false);
        }
        document.addEventListener('click',bodyClick);

        return () => {
            document.removeEventListener('click',bodyClick)
        }
    },[])

    return (
        <div className='selectBox' onClick={(e)=> e.stopPropagation()}>
            <button onClick={()=>setActive(true)}>{list[type]}</button>
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

