import React, { useContext, useEffect, useState } from 'react';
import BoardLink from '../components/BoardLink';
import { inputChange, inputsRequiredAdd } from '../api/validation';
import { ThemeContext } from '../context/ThemeContext';
import { getApi, postApi } from '../api/api';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// 주식상담소 신청 방법 안내
// 계좌로 입금해주세요. 00은행 1234-000-000000, (주)위드퀀트
// 아래 항목을 작성해주세요. 투자기간, 투자금액, 원하는 수익률
// 담당자가 확인 후 댓글과 연락을 드립니다.

// VIP 상품 신청 방법 안내
// 계좌로 입금해주세요. 국민은행 64133701003692, 위드퀀트
// 아래 항목을 작성해주세요. 투자기간, 투자금액, 원하는 수익률
// 담당자가 확인 후 댓글과 연락을 드립니다.
const text = {
    vip: {
        title: 'VIP 상품 신청 방법 안내',
        list: [
            '계좌로 입금해주세요. 국민은행 64133701003692, 위드퀀트',
            '아래 항목을 작성해주세요. 투자기간, 투자금액, 원하는 수익률',
            '담당자가 확인 후 댓글과 연락을 드립니다.'
        ]
    },
    clinic: {
        title: '주식상담소 신청 방법 안내',
        list: [
            '계좌로 입금해주세요. 00은행 1234-000-000000, (주)위드퀀트',
            '아래 항목을 작성해주세요. 투자기간, 투자금액, 원하는 수익률',
            '담당자가 확인 후 댓글과 연락을 드립니다.'
        ]
    }
}
export default function CustomerWrite() {
    const { user } = useContext(ThemeContext);
    const description = text['vip'];
    const navigate = useNavigate();
    const pathName = useLocation().pathname.split('/').slice(0, -1);
    const link = pathName.join('/');
    // const boardType = pathName[1];
    // const apiType = pathName[2];
    const { id, boardType } = useParams();
    
    const [inputs, setInputs] = useState({boardType})

    useEffect(()=>{
        inputsRequiredAdd(setInputs)
        console.log(user);
        if(!id) return;
        getApi('boards/detail', {boardId: id, boardType: boardType})
            .then(({ result, data, isSecretUser, isUpdateUser } = {}) => {
                if(result){
                    if(!isUpdateUser){
                        navigate(link)
                    }
                    console.log(isSecretUser);
                    console.log(data);
                    
                }
            })
    }, [user, navigate, link, id, boardType])
    

    const onSubmit = (e) => {
        console.log(inputs);
        postApi('boards/create', inputs)
            .then((result)=>{
                console.log(result);
                
            })
        e.preventDefault();
    }
    return (
        <>
            <div>
                { description && 
                    <>
                        <h3>{ description.title }</h3>
                        <ol>
                            { description.list.map((data, idx)=> 
                                <li key={idx}>{ data }</li>
                            )}
                        </ol>
                    </>
                }
                <BoardLink>목록</BoardLink>
                <form>
                    <ul>
                        <li>
                            <label htmlFor="title">제목</label>
                            <div>
                                <input 
                                    type="text"
                                    placeholder='제목을 입력하세요.'
                                    name='title'
                                    id='title'
                                    required
                                    onChange={(e)=>inputChange(e, setInputs)}
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="author">작성자</label>
                            <div>
                                <input 
                                    type="text"
                                    placeholder='작성자를 입력하세요.'
                                    defaultValue={user?.userId}
                                    name='author'
                                    id='author'
                                    readOnly={user}
                                    onChange={(e)=>inputChange(e, setInputs)}
                                />
                            </div>
                        </li>
                        <li>
                            <label htmlFor="content">내용</label>
                            <div>
                                <textarea 
                                    name="content"
                                    id="content"
                                    placeholder='내용을 입력하세요.'
                                    required
                                    onChange={(e)=>inputChange(e, setInputs)}
                                >
                                </textarea>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="secret">상태</label>
                            <div>
                                <input 
                                    type="checkbox" 
                                    name='secret'
                                    id='secret'
                                    onChange={(e)=>inputChange(e, setInputs)}
                                />
                                <label htmlFor="secret">비밀글</label>
                            </div>
                        </li>
                    </ul>
                    <input type="submit" value="등록" className='btn-bg-small' onClick={onSubmit}/>
                </form>
            </div>
        </>
    );
}

