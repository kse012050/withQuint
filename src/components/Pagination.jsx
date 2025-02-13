import React from 'react';
import { Link } from 'react-router-dom';
import { useStyleIdx } from '../js/style';

export default function Pagination({ info }) {
    useStyleIdx()
    
    const limit = 5;
    
    const totalPages = info.totalPage;
    const currentPage = info.page;

    
    const pageLinks = [];
    const startPage = Math.floor((currentPage - 1) / limit) * limit + 1
    const endPage = Math.min(startPage * limit, totalPages); 

    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(i);
    }
    
    return (
        <div className='board-paging' data-styleidx="a">
            <Link to='?page=1'>처음</Link>
            <Link to={`?page=${Math.max(info.page - 1, 1)}`} disabled>이전</Link>
            <ol>
                {pageLinks.map((page) => (
                    <li key={page}>
                        <Link to={`?page=${page}`} className={page === currentPage ? 'active' : ''}>{page}</Link>
                    </li>
                ))}
            </ol>
            <Link to={`?page=${Math.min(info.page + 1, info.totalPage)}`}>다음</Link>
            <Link to={`?page=${info.totalPage}`}>마지막</Link>
        </div>
    );
}

