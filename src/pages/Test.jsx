import React, { useState } from 'react';
import { inputChange } from '../api/validation';
import { imgApi, postApi } from '../api/api';

export default function Test() {
    const [inputs, setInputs] = useState()

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        imgApi('vipProducts', inputs)
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
                    <input type="text" name='name' onChange={(e)=>inputChange(e, setInputs)}/>
                    <input type="text" name='price' onChange={(e)=>inputChange(e, setInputs)}/>
                    <textarea name='description' onChange={(e)=>inputChange(e, setInputs)}></textarea>
                    <input type="file" name="image" id="image" onChange={(e)=>inputChange(e, setInputs)}/>
                    <label htmlFor="image">image</label>
                    <input type="submit" value="테스트" onClick={onSubmit}/>
                </fieldset>
            </form>

        </>
    );
}

