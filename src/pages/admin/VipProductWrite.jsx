import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApi, isSubmit, postApi } from '../../api/api';
import { inputChange, inputsRequiredAdd } from '../../api/validation';

export default function VipProductWrite() {
    const { id } = useParams();
    const [inputs, setInputs] = useState();
    const [image, setImage] = useState()
    const createdRef = useRef(null)
    const [popup, setPopup] = useState()
    const navigate = useNavigate()
    const prevLink = useLocation().pathname.split('/').slice(0, -1).join('/');

    useEffect(()=>{
        if(id){
            getApi('vipProducts/detail', {boardId: id})
                .then(({ result, state, data } = {} )=>{
                    console.log(data);
                    setImage(data.image)
                    setInputs(data);
                    createdRef.current = data.created
                })
        }else{
            inputsRequiredAdd(setInputs)
        }
    }, [id])

     const onImage = (e) => {
        const { files } = e.target;
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            setImage(fileURL);
        }
        fileReader.readAsDataURL(files[0]);
        inputChange(e, setInputs)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(isSubmit(inputs)){
            return;
        }

        postApi(`vipProducts/${id ? 'update' : 'create'}`, inputs)
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

    const onDelete = () => {
        // setPopup({
        //     type: 'check',
        //     title: '안내',
        //     description: '삭제하시겠습니까?',
        //     func: () => {
        //         postApi('boards/remove', {id})
        //             .then(({ result, state, message } = {})=>{
        //                 if(result && state){
        //                     setPopup({
        //                         title: '안내',
        //                         description: message,
        //                         func: () => navigate(prevLink)
        //                     })
        //                 }
        //             })
        //     }
        // })
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
                        <label htmlFor="name">상품명</label>
                        <div>
                            <input 
                                type="text"
                                name='name'
                                id='name'
                                defaultValue={inputs?.name}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="nameEng">상품명 ( 영어 )</label>
                        <div>
                            <input 
                                type="text"
                                name='nameEng'
                                id='nameEng'
                                defaultValue={inputs?.nameEng}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="price">가격</label>
                        <div>
                            <input 
                                type="text"
                                name='price'
                                id='price'
                                defaultValue={inputs?.price}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="description">내용</label>
                        <div>
                            <input 
                                type="text"
                                name='description'
                                id='description'
                                defaultValue={inputs?.description}
                                onChange={(e)=>inputChange(e, setInputs)}
                                required
                            />
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">이미지</label>
                        <div>
                            <input type="file" name="image" id="boardImage" onChange={(e)=>onImage(e)}/>
                            <label htmlFor="boardImage">
                                <img src={image} alt="" />
                            </label>
                        </div>
                    </li>
                    <li>
                        <label htmlFor="">등록일</label>
                        <div>
                            <input type="text" defaultValue={createdRef.current} readOnly/>
                        </div>
                    </li>
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
                                required
                            />
                            <label htmlFor="visible_n">숨김</label>
                        </div>
                    </li>
                </ul>
                <div className='detail-update'>
                    <Link to={prevLink} className='btn-gray'>목록</Link>
                    <button className='btn-bg-small' onClick={onSubmit}>{ id ? '수정' : '생성' }</button>
                </div>
            </form>
        </>
    );
}

