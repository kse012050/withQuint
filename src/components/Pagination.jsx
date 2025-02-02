import React from 'react';
import { Link } from 'react-router-dom';
import { useStyleIdx } from '../js/style';

export default function Pagination({ info }) {
    useStyleIdx()
    
    return (
        <div className='board-paging' data-styleidx="a">
            <Link to='?page=1'>처음</Link>
            <Link to={`?page=${info.page - 1}`}>이전</Link>
            <ol>
                <li><Link to=''>1</Link></li>
                <li><Link to=''>2</Link></li>
                <li><Link to=''>3</Link></li>
                <li><Link to=''>4</Link></li>
                <li><Link to=''>5</Link></li>
            </ol>
            <Link to={`?page=${info.page + 1}`}>다음</Link>
            <Link to={`?page=${info.totalPage}`}>마지막</Link>
        </div>
    );
}

