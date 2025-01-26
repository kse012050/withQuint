import React, { useState } from 'react';
import { inputChange } from '../api/validation';
import { imgApi/* , postApi */ } from '../api/api';

export default function Test() {
    const [inputs, setInputs] = useState()

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        imgApi('vipProducts/create', inputs)
            .then((result)=>{
                console.log(result);
                
            })

            
        // postApi('vipProducts', inputs)
        //     .then((result)=>{
        //         console.log(result);
        //     })
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
                            <input type="text" name='name' onChange={(e)=>inputChange(e, setInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">이름 - 영어</label>
                            <input type="text" name='nameEng' onChange={(e)=>inputChange(e, setInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">가격</label>
                            <input type="text" name='price' onChange={(e)=>inputChange(e, setInputs)}/>
                        </li>
                        <li>
                            <label htmlFor="">내용</label>
                            <textarea name='description' onChange={(e)=>inputChange(e, setInputs)}></textarea>
                        </li>
                        <li>
                            <label htmlFor="">이미지</label>
                            <input type="file" name="image" id="image" onChange={(e)=>inputChange(e, setInputs)}/>
                            <label htmlFor="image">image</label>
                        </li>
                    </ul>
                    <input type="submit" value="테스트" onClick={onSubmit}/>
                </fieldset>
            </form>

        </>
    );
}

