// 필수 입력 학목 추가
export const inputsRequiredAdd = (setInputs) =>{
    document.querySelectorAll('[required]').forEach(({ name, type, value, checked })=>{
        if(name.includes('check')){
            return;
        }
        if(type === 'checkbox' || type === 'radio'){
            setInputs((input)=>({...input, [name]: checked ? 'y' : 'n'}))
        }else{
            setInputs((input)=>({...input, [name]: value || ''}))
        }
    })
}

// 입력 값 검사
const formetMap = {
    id(value) {
        const regex = /^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"]*$/;
        return {
            is: regex.test(value),
            value: /^[0-9!@#$%^&*()_+-=,.<>?/;:'"]/.test(value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')) ? value.slice(1) : value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')
        };
    },
    pw(value) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"]*$/;
        return {
            is: regex.test(value),
            value: value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '')
        };
    },
    nickname(value) {
        const regex = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
        return {
            is: regex.test(value),
            value: value.replace(/[!@#$%^&*()_+\-=,.<>?/;:'"]/g, '')
        };
    },
    numb(value) {
        const regex = /^[0-9]+$/;
        return {
            is: regex.test(value),
            value: value.replace(/\D/g, '')
        };
    },
}

export function isFormet(type, value){
    return Object.keys(formetMap).includes(type) && formetMap[type](value);
}

const validationMap = {
    id(value) {
        const regex = /^.{4,20}$/;
        return regex.test(value);
    },
    pw(value) {
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=,.<>?/;:'"]).{8,20}$/;
        return regex.test(value);
    },
    checkPW(value, checkValue){
        return value === checkValue
    },
    nickname(value) {
        const regex = /[^가-힣0-9a-zA-Z\s]/g;
        return !regex.test(value);
    },
    mobile(value){
        const regex = /^010\d{8}$/;
        return regex.test(value);
    },
    mobileConfirm(value){
        const regex = /^.{6}$/;
        return regex.test(value);
    },
}

export function isValidation(type, value, checkValue){
    return Object.keys(validationMap).includes(type) && validationMap[type](value, checkValue);
}

export const inputChange = (e, setInputs, checkValue) => {
    const { value, name, checked, type, dataset: { formet, validation } } = e.target;
    
    if(formet && !!value && !isFormet(formet, value)['is']){
        const cur = e.target.selectionStart - 1;
        e.target.value = isFormet(formet, value)['value'];
        e.target.setSelectionRange(cur, cur);
        e.target.classList.add('error')
        console.log(1);
        
        return
    }else if(validation && !isValidation(validation, value, checkValue)){
        e.target.classList.add('error')
        setInputs((input)=> ({...input, [name]: ''}) )
        console.log(2);
        return
    }else if(e.target.classList.contains('error')){
        e.target.classList.remove('error')
    }

    if(type === 'checkbox'){
        setInputs((input)=> ({...input, [name]: checked ? 'y': 'n'}))
    }else if(type === 'radio'){
        setInputs((input)=> ({...input, [name]: value}))
    }else{
        setInputs((input)=> ({...input, [name]: e.target.value}))
    }
}

export const inputErrCheck = (e) => {
    const { value, dataset : { formet, validation }} = e.target;
    if(isFormet(formet, value) && isValidation(validation, value)){
        e.target.classList.remove('error')
    }
}

