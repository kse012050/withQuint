import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApi, isSubmit, postApi } from '../../api/api';
import { inputChange, inputsRequiredAdd } from '../../api/validation';
import Popup from '../../components/Popup';

export default function Write() {
    const { id, boardType } = useParams();
    const [inputs, setInputs] = useState({boardType});
    const createdRef = useRef(null)
    const [image, setImage] = useState()
    const [popup, setPopup] = useState()
    const isType = useMemo(() => ['recommendation', 'revenue'], []);
    const isImage = useMemo(() => ['stock', 'vipProduct'], []);
    const isUnUpdate = ['vip', 'clinic'].includes(boardType);
    const navigate = useNavigate()
    const prevLink = useLocation().pathname.split('/').slice(0, -1).join('/');

    useEffect(()=>{
        if(id){
            getApi('boards/detail', {boardId: id, boardType})
                .then(({ result, state, data } = {} )=>{
                    if(result && state){
                        const obj = {title: data.title, content: data.content, visible: data.visible}
                        isType.includes(boardType) && (obj.type = data.type)
                        if(isImage.includes(boardType)){
                            // obj.image = data.image
                            setImage(data.image)
                        }
                        setInputs((input)=> ({...input, ...obj, boardId: id}))
                        createdRef.current = data.created
                    }else{
                        navigate(prevLink)
                    }
                })
        }else{
            inputsRequiredAdd(setInputs)
        }
    }, [id, boardType, isType, isImage, navigate, prevLink])

    const onImage = (e) => {
        const { files } = e.target;
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            setImage(fileURL);
        }
        console.log(files[0]);
        
        fileReader.readAsDataURL(files[0]);
        inputChange(e, setInputs)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        
        // if(isSubmit(inputs)){
        //     return;
        // }

        postApi(`boards/${id ? 'update' : 'create'}`, inputs)
            .then(({ result, state, message } = {})=>{
                console.log(message);
                
                if(result && state){
                    setPopup({
                        title: '안내',
                        description: message,
                        func: () => navigate(prevLink)
                    })
                }
            })
    }

    const onDelete = () => {
        setPopup({
            type: 'check',
            title: '안내',
            description: '삭제하시겠습니까?',
            func: () => {
                postApi('boards/remove', {id})
                    .then(({ result, state, message } = {})=>{
                        if(result && state){
                            setPopup({
                                title: '안내',
                                description: message,
                                func: () => navigate(prevLink)
                            })
                        }
                    })
            }
        })
    }

    return (
        <>
            { id && <button className='btn-bg-small' onClick={onDelete}>삭제</button> }
            <form>
                <ul className='detail-list'>
                    { id &&
                        <li>
                            <label htmlFor="id">No.</label>
                            <div>
                                <input 
                                    type="text"
                                    id='id'
                                    name='id'
                                    defaultValue={id}
                                    readOnly
                                />
                            </div>
                        </li>
                    }
                    <li>
                        <label htmlFor="title">제목</label>
                        <div>
                            <input 
                                type="text"
                                name='title'
                                id='title'
                                defaultValue={inputs?.title}
                                onChange={(e)=>inputChange(e, setInputs)}
                                readOnly={isUnUpdate}
                                required
                            />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="content">내용</label>
                        <div>
                            <textarea 
                                name="content"
                                id="content"
                                defaultValue={inputs?.content}
                                onChange={(e)=>inputChange(e, setInputs)}
                                readOnly={isUnUpdate}
                                required
                            >
                            </textarea>
                        </div>
                    </li>
                    { isImage.includes(boardType) &&
                        <li>
                            <label htmlFor="">이미지</label>
                            <div>
                                <input type="file" name="image" id="boardImage" onChange={(e)=>onImage(e)}/>
                                <label htmlFor="boardImage">
                                    <img src={image} alt="" />
                                </label>
                            </div>
                        </li>
                    }
                    { isType.includes(boardType) &&
                        <li>
                            <label htmlFor="type_y">타입</label>
                            <div>
                                <input 
                                    type="radio" 
                                    name="type"
                                    id="type_free"
                                    value="free"
                                    checked={inputs?.type === 'free'}
                                    onChange={(e)=>inputChange(e, setInputs)}
                                    readOnly={isUnUpdate}
                                    required
                                />
                                <label htmlFor="type_free">무료</label>
                                <input 
                                    type="radio" 
                                    name="type"
                                    id="type_vip"
                                    value="vip"
                                    checked={inputs?.type === 'vip'}
                                    onChange={(e)=>inputChange(e, setInputs)}
                                    readOnly={isUnUpdate}
                                    required
                                />
                                <label htmlFor="type_vip">VIP</label>
                            </div>
                        </li>
                    }
                    { id &&
                        <li>
                            <label htmlFor="">등록일</label>
                            <div>
                                <input type="text" defaultValue={createdRef.current} readOnly/>
                            </div>
                        </li>
                    }
                    <li>
                        <label htmlFor="visible_y">상태</label>
                        <div>
                            <input 
                                type="radio"
                                name="visible"
                                id='visible_y'
                                value="y"
                                checked={inputs?.visible === 'y'}
                                onChange={(e)=>inputChange(e, setInputs)}
                                disabled={isUnUpdate}
                                required
                            />
                            <label htmlFor="visible_y">노출</label>
                            <input 
                                type="radio"
                                name="visible"
                                id='visible_n'
                                value="n"
                                checked={inputs?.visible === 'n'} 
                                onChange={(e)=>inputChange(e, setInputs)}
                                disabled={isUnUpdate}
                                required
                            />
                            <label htmlFor="visible_n">숨김</label>
                        </div>
                    </li>
                </ul>
                <div className='detail-update'>
                    <Link to={prevLink} className='btn-gray'>목록</Link>
                    { !isUnUpdate &&
                        <button className='btn-bg-small' onClick={onSubmit}>{ id ? '수정' : '생성' }</button>
                    }
                </div>
            </form>
            {popup &&
                <Popup popup={popup} setPopup={setPopup} />
            }
        </>
    );
}

