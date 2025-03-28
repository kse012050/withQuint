import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getApi, postApi } from '../api/api';
import BoardLink from '../components/BoardLink';
import Popup from '../components/Popup';
import { ThemeContext } from '../context/ThemeContext';

export default function Detail() {
    const { user } = useContext(ThemeContext);
    const [detail, setDetail] = useState();
    const [post, setPost] = useState();
    const [popup, setPopup] = useState();
    const [isUpdate, setIsUpdate] = useState(false)
    const navigate = useNavigate()
    const pathName = useLocation().pathname;
    const boardId = pathName.slice(1).split('/').at(-1);
    const boardType = pathName.slice(1).split('/').at(-2);
    const link = pathName.split('/').slice(0, -1).join('/');
    console.log(link);
    
    useEffect(() => {
        getApi('boards/detail', {boardId, boardType})
            .then(({ result, data, post, isSecretUser, isUpdateUser } = {}) => {
                if(result && isSecretUser !== false){
                    setIsUpdate(isUpdateUser)
                    setDetail(data)
                    setPost(post)
                }else{
                    navigate(link)
                }
            }) 
    },[boardId, boardType, navigate, user, link])

    const onDelete = () => {
        setPopup({
            type: 'check',
            title: '안내',
            description: '게시글을 삭제하시겠습니까?',
            func: () => {
                postApi('boards/remove', {boardId: detail.id})
                    .then(({ result })=> {
                        if(result){
                            navigate(link)
                        }
                    })
            }
        })
    }

    function postData(post){
        return (
            <div className='detail-post'>
                {Object.entries(post).map(([key, data]) => 
                    <React.Fragment key={data.id}>
                        <BoardLink data={data}>
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
                {isUpdate ?
                    <div className='detail-update'>
                        <Link to='update' className='btn-bg-small'>수정</Link>
                        <button className='btn-border-small' onClick={onDelete}>삭제</button>
                    </div> :
                    <BoardLink>목록</BoardLink>
                }
                {post && postData(post)}
            </div>
            { popup && <Popup popup={popup} setPopup={setPopup}/> }
        </>
    );
}

