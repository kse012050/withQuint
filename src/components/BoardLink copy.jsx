import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BoardLink({ id, children }) {
    const pathName = useLocation().pathname;
    const postLink = pathName.split('/').filter((data) => !Number(data)).join('/')
    return (
        <Link to={`${postLink}${id ? `/${id}` : ''}`}>
            {children}
        </Link>
    );
}

