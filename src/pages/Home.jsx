import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Home() {
    return (
        <>
            <Helmet>
                <link rel="stylesheet" href="./css/test.css" />
            </Helmet>
            <div>
                home123
            </div>
        </>
    );
}

