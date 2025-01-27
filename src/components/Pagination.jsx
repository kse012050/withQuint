import React from 'react';
import { Link } from 'react-router-dom';

export default function Pagination() {
    return (
        <div className='board-paging' data-styleidx="a">
            <Link to=''>처음</Link>
            <Link to=''>이전</Link>
            <ol>
                <li><Link to=''>1</Link></li>
                <li><Link to=''>2</Link></li>
                <li><Link to=''>3</Link></li>
                <li><Link to=''>4</Link></li>
                <li><Link to=''>5</Link></li>
            </ol>
            <Link to=''>다음</Link>
            <Link to=''>마지막</Link>
        </div>
    );
}

