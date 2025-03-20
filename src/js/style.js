import { useLayoutEffect } from 'react';

// css용 index
export function styleIdx(){
    document.querySelectorAll('[data-styleidx]').forEach((parents)=>{
        let children = []
        parents.getAttribute('data-styleIdx') !== 'true' ?
            parents.childNodes.forEach((element)=>{
                element.tagName.toLowerCase() === parents.getAttribute('data-styleIdx') && children.push(element)
            }) : 
            (children = [...parents.childNodes]);
        parents.style.setProperty('--styleTotal', children.length - 1);
        children.forEach((element, idx)=>{
            element.style.setProperty('--styleIdx', idx);
        })
    })
}



export const useStyleIdx = (dependencies) => {
    useLayoutEffect(() => {
        if (document.querySelectorAll('[data-styleidx]').length) {
            styleIdx(); // 스타일 적용
        }
    }, [dependencies]); // 의존성 배열로 스타일 적용
};
