// 필수 입력 학목 추가
export const inputsRequiredAdd = (setInputs) =>{
    document.querySelectorAll('[required]').forEach(({ name, type, value, checked })=>{
/*         if(name.includes('check')){
            return;
        } */
        setInputs((input = {})=>{
            if(type === 'checkbox'){
                input[name] = checked ? 'y' : 'n';
            }else if(!input[name]){
                input[name] = value;
            }
            return {...input};
        })
    })
}

// 입력 값 검사
const formetMap = {
    id(value) {
        const regex = /^[a-zA-Z0-9]*$/;
        return {
            is: regex.test(value),
        };
    },
    password(value) {
        const regex = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?/;:'"]*$/;
        return {
            is: regex.test(value),
        };
    },
    nickname(value) {
        const regex = /^[a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
        return {
            is: regex.test(value),
        };
    },
    numb(value) {
        const regex = /^[0-9]+$/;
        return {
            is: regex.test(value),
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
    password(value) {
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
    const { value, name, checked, type, dataset: { formet, validation, resetName }, files } = e.target;
    
    
    if(formet && !!value && !isFormet(formet, value)['is']){
        e.target.classList.add('error')
        return
    }else if(validation && !isValidation(validation, value, checkValue)){
        e.target.classList.add('error')
        setInputs((input)=> ({...input, [name]: ''}) )
        return
    }else if(e.target.classList.contains('error')){
        e.target.classList.remove('error')
    }

    
    if(resetName){
        const target = document.querySelector(`[name="${resetName}"]`);
        const resetValue = target?.value;
    
        if (resetValue) {
            const isMismatch = value !== resetValue;
            target.classList.toggle('error', isMismatch);
            setInputs(input => ({
                ...input,
                [resetName]: isMismatch ? '' : value
            }));
        }
    }
    
    if(type === 'checkbox'){
        setInputs((input)=> ({...input, [name]: checked ? 'y': 'n'}))
    }else if(type === 'radio'){
        setInputs((input)=> ({...input, [name]: value}))
    }else if(type === 'file'){
        setInputs((input)=> ({...input, [name]: files[0]}))
    }else{
        setInputs((input)=> ({...input, [name]: e.target.value}))
    }
}

export const checkInputChange = (e, setInputs, setCheckInputs) =>{
    const { name, dataset: { resetName } } = e.target;
    setInputs(prev => {
        const obj = {...prev};
        if(obj[resetName || name]){
            obj[resetName || name] = '';
        }
        return obj;
    });
    inputChange(e, setCheckInputs)
}

export const inputErrCheck = (e) => {
    const { value, dataset : { formet, validation }} = e.target;
    if(isFormet(formet, value) && isValidation(validation, value)){
        e.target.classList.remove('error')
    }
}