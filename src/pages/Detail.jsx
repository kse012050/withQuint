import React, { useEffect, useState } from 'react';
import SubTitle from '../components/SubTitle';
import { Link, useLocation } from 'react-router-dom';
import { getApi } from '../api/api';

export default function Detail() {
    const [detail, setDetail] = useState();
    const [post, setPost] = useState();
    const pathName = useLocation().pathname;
    const boardId = pathName.slice(1).split('/').at(-1);
    const boardType = pathName.slice(1).split('/').at(0);
    const postLink = pathName.split('/').filter((data) => !Number(data)).join('/')
    
    
    useEffect(() => {
        getApi('boards/detail', {boardId, boardType})
            .then(({ result, data, post } = {}) => {
                if(result){
                    setDetail(data)
                    setPost(post)
                }
            })
    },[boardId, boardType])

    function postData(post){
        return (
            <div className='detail-post'>
                {Object.entries(post).map(([key, data]) => 
                    <Link to={`${postLink}/${data.id}`} key={data.id}>
                        {key === 'prev' && '이전 글'}
                        {key === 'next' && '다음 글'}
                        <strong>
                            {data.title}
                        </strong>
                    </Link>
                )}
            </div>
        )
    }
    
    return (
        <>
            <SubTitle />
            <div>
                <Link to=''>목록</Link>
                <div className='detail-title'>
                    <h3>{ detail?.title }</h3>
                    <span>No.{ detail?.id }</span>
                    <span>{ detail?.author }</span>
                    <time dateTime="">{ detail?.created }</time>
                </div>
                <div className='detail-content'>
                    { detail?.content }
                </div>
                <div className='detail-comments'>
                    댓글
                </div>
                <Link to=''>목록</Link>
                {post && postData(post)}
            </div>
        </>
    );
}

