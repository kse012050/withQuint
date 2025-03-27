import React from 'react';
import BoardLink from '../components/BoardLink';
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
    const description = text['vip']
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
                            <label htmlFor="">제목</label>
                            <div>
                                <input type="text" placeholder='제목을 입력하세요.'/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">작성자</label>
                            <div>
                                <input type="text" placeholder='작성자를 입력하세요.'/>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">내용</label>
                            <div>
                                <textarea name="" id="" placeholder='내용을 입력하세요.'></textarea>
                            </div>
                        </li>
                        <li>
                            <label htmlFor="">상태</label>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">비밀글</label>
                            </div>
                        </li>
                    </ul>
                    <input type="submit" value="등록" className='btn-bg-small'/>
                </form>
            </div>
        </>
    );
}

