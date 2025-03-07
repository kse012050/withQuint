import React, { useEffect, useState } from 'react';
import SubTitle from '../components/SubTitle';
import { useLocation } from 'react-router-dom';
import { getApi } from '../api/api';
import BoardLink from '../components/BoardLink';

export default function Detail() {
    const [detail, setDetail] = useState();
    const [post, setPost] = useState();
    const pathName = useLocation().pathname;
    const boardId = pathName.slice(1).split('/').at(-1);
    const boardType = pathName.slice(1).split('/').at(-2);
    
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
                    <React.Fragment key={data.id}>
                        <BoardLink id={data.id}>
                            {key === 'prev' && '이전 글'}
                            {key === 'next' && '다음 글'}
                            <strong>
                                {data.title}
                            </strong>
                        </BoardLink>
                    </React.Fragment>
                )}
            </div>
        )
    }
    
    return (
        <>
            <SubTitle />
            <div>
                <BoardLink>목록</BoardLink>
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
                <BoardLink>목록</BoardLink>
                {post && postData(post)}
            </div>
        </>
    );
}

