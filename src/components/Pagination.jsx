import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useStyleIdx } from '../js/style';

export default function Pagination({ info }) {
    const [searchParams] = useSearchParams();
    
    useStyleIdx()

    const pageNumb = () => {
        const limit = 5;
        
        const totalPages = info.totalPage;
        const currentPage = info.page;
    
        
        const pageLinks = [];
        const startPage = Math.floor((currentPage - 1) / limit) * limit + 1
        const endPage = Math.min(startPage * limit, totalPages); 
    
        for (let i = startPage; i <= endPage; i++) {
            pageLinks.push(i);
        }
        return pageLinks;
    }


    const getUpdatedUrl = (newPage) => {
        const searchParamsObj = new URLSearchParams(searchParams);
        searchParamsObj.set("page", newPage);
        return `?${searchParamsObj.toString()}`;
    };
    
    return (
        <div className='board-paging' data-styleidx="a">
            <Link to={getUpdatedUrl(1)}>처음</Link>
            <Link to={getUpdatedUrl(Math.max(info.page - 1, 1))} disabled>이전</Link>
            <ol>
                {pageNumb().map((page) => (
                    <li key={page}>
                        <Link to={getUpdatedUrl(page)} className={page === info.page ? 'active' : ''}>{page}</Link>
                    </li>
                ))}
            </ol>
            <Link to={getUpdatedUrl(Math.min(info.page + 1, info.totalPage))}>다음</Link>
            <Link to={getUpdatedUrl(info.totalPage)}>마지막</Link>
        </div>
    );
}

