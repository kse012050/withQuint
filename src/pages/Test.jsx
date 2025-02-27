import React, { useState } from 'react';
import { inputChange } from '../api/validation';
import { /* imgApi, */ postApi } from '../api/api';

// function selectChange(e, setInputs){
//     const { name, value } = e.target;
//     setInputs((input)=> ({...input, [name]: value}))
// }

export default function Test() {
    const [vipInputs, setVipInputs] = useState()
    const [boardInputs, setBoardInputs] = useState({author: '20', boardType: 'recommendation'})

    const vipSubmit = (e) =>{
        e.preventDefault();
        console.log(vipInputs);
        postApi('vipProducts/create', vipInputs)
            .then((result)=>{
                console.log(result);
                
            })

            
        // postApi('vipProducts', inputs)
        //     .then((result)=>{
        //         console.log(result);
        //     })
    }
    const boardSubmit = (e) =>{
        e.preventDefault();
        console.log(boardInputs);
        postApi('boards/create', boardInputs)
            .then((result)=>{
                console.log(result);
                
            })
    }

    return (
        <>
            <h2>테스트</h2>
            <form>
                <fieldset>
                    <legend>vip 상품</legend>
                    <ul>
                        <li>
                            <label htmlFor="">이름</label>
                            <input type="text" name='name' onChange={(e)=>inputChange(e, setVipInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">이름 - 영어</label>
                            <input type="text" name='nameEng' onChange={(e)=>inputChange(e, setVipInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">가격</label>
                            <input type="text" name='price' onChange={(e)=>inputChange(e, setVipInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">내용</label>
                            <textarea name='description' onChange={(e)=>inputChange(e, setVipInputs)}></textarea>
                        </li>
                        <li>
                            <label htmlFor="">이미지</label>
                            <input type="file" name="image" id="image" onChange={(e)=>inputChange(e, setVipInputs)}/>
                            <label htmlFor="image">image</label>
                        </li>
                    </ul>
                    <input type="submit" value="vip상품 생성" onClick={vipSubmit}/>
                </fieldset>
            </form>
            <form>
                <fieldset>
                    <legend>게시물</legend>
                    <ul>
                        <li>
                            <label htmlFor="">제목</label>
                            <input type="text" name='title' onChange={(e)=>inputChange(e, setBoardInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">게시물 타입</label>
                            <select name="boardType" onChange={(e)=>inputChange(e, setBoardInputs)}>
                                <option value="recommendation">recommendation</option>
                                <option value="revenue">revenue</option>
                                <option value="stock">stock</option>
                                <option value="vip">vip</option>
                                <option value="clinic">clinic</option>
                                <option value="notice">notice</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">타입</label>
                            <select name="type" onChange={(e)=>inputChange(e, setBoardInputs)}>
                                <option value="">선택안함</option>
                                <option value="free">무료</option>
                                <option value="vip">vip</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="">이미지 - stock일 때</label>
                            <input type="file" name="image" id="boardImage" onChange={(e)=>inputChange(e, setBoardInputs)}/>
                            <label htmlFor="boardImage">이미지</label>
                        </li>
                        <li>
                            <label htmlFor="">내용</label>
                            <textarea name='content' onChange={(e)=>inputChange(e, setBoardInputs)}></textarea>
                        </li>
                        <li>
                            <label htmlFor="">비밀글</label>
                            <input type="radio" id='secret_y' name='secret' value='y' onChange={(e)=>inputChange(e, setBoardInputs)}/>
                            <label htmlFor="secret_y">예</label>
                            <input type="radio" id='secret_n' name='secret' value='n' onChange={(e)=>inputChange(e, setBoardInputs)}/>
                            <label htmlFor="secret_n">아니오</label>
                        </li>
                    </ul>
                    <input type="submit" value="게시물 생성" onClick={boardSubmit}/>
                </fieldset>
            </form>

        </>
    );
}

