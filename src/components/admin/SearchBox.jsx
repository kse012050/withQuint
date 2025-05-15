import { useState } from "react";
import { inputChange } from "../../api/validation";
import { useNavigate } from "react-router-dom";
import { day } from "../../js/utils";

const dateSelects = [
    { label: '전체', value: undefined },
    { label: '오늘', value: 1 },
    { label: '7일', value: 7 },
    { label: '30일', value: 30 }
];

export default function SearchBox({ search, setSearch }) {
    const [dateSelect, setDateSelect] = useState(dateSelects[0].label);
    const navigate = useNavigate();

    const onDate = (e) =>{
        const { name, value } = e.target;
        navigate('?' + new URLSearchParams({...search, [name]: value}))
    }

    const onDateSelect = (e) => {
        const { value, innerText } = e.target;
        navigate('?' + new URLSearchParams({...search, dateStart: value ? day(value) : '', dateEnd: day()}))
        setDateSelect(innerText)
    }

    const onSearch = () =>{
        navigate('?' + new URLSearchParams(search))
    }

    return (
        <>
            <div className='board-registration'>
                <label htmlFor="">등록일</label>
                <div>
                    <input type="date" name='dateStart' value={search?.dateStart || ''} onChange={onDate} max={search?.dateEnd}/>
                    ~
                    <input type="date" name='dateEnd' value={search?.dateEnd || ''} onChange={onDate} min={search?.dateStart} max={search?.dateEnd}/>
                    {dateSelects.map((data, index) =>
                        <button key={index} className={`btn-gray ${dateSelect === data.label ? 'active' : ''}`} value={data.value} onClick={onDateSelect}>{data.label}</button>
                    )}
                </div>
            </div>
            <div className='board-search'>
                <label htmlFor="">검색어</label>
                <div className='searchBox'>
                    <input type="search" placeholder='제목' name='search' value={search?.search || ''} onChange={(e) => inputChange(e, setSearch)} onKeyDown={(e)=> e.key === 'Enter' && onSearch(e)}/>
                    <button onClick={onSearch}>검색</button>
                </div>
            </div>
        </>
    );
}

