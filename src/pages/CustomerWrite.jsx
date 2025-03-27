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
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor=""></label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor=""></label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <label htmlFor=""></label>
                                <div>
                                    <textarea name="" id=""></textarea>
                                </div>
                            </li>
                            <li>
                                <label htmlFor=""></label>
                                <div>
                                    <input type="text" />
                                </div>
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        </>
    );
}

