// import { isFormet, isValidation } from "./validation";

const userApiUrl =  process.env.REACT_APP_API_URL;
// const adminApiUrl =  `${process.env.REACT_APP_API_URL}admin/`;

export function isSubmit(inputs){
    if(inputs){
        const inputsSelectors = Array.from(document.querySelectorAll(`input[name][required]`));
        inputsSelectors.forEach(({ type, value, name }) => {
            if ((type === 'checkbox' && value === 'n') || !inputs[name]) {
                document.querySelector(`[name="${name}"]`).classList.add('error');
            }
        })
        
        return inputsSelectors.some(({ value, name/* , dataset: { formet, validation } */ }) => {
            if(!value || !inputs[name]){
                document.querySelector(`[name="${name}"]`).focus()
                return true; 
            }
            return false;
        })
    }
}

function apiOption(type, data){
    const option = {
        method: type,
        credentials: 'include',
    }
    
    const isFormData = data && Object.values(data).some(value => value instanceof File || value instanceof Blob);

    if(isFormData){
        const formdata = new FormData();
        Object.entries(data).forEach(([key, value]) =>{
            formdata.append(key, value);
        })
        option.body = formdata;
    }else if(type === 'POST'){
        option.body = JSON.stringify(data);
        option.headers = {"Content-Type": "application/json"}
    }

    return option;
}

export function postApi(url, data){
    const options = apiOption('POST', data);
    return userApi(url, options)
}

export function getApi(url, data){
    const options = apiOption('GET', data);
    
    if(data){
        url = url + '?' + new URLSearchParams(data)
    }

    return userApi(url, options)
}

function userApi(url, apiOptions){
    // const isAdmin = window.location.pathname.includes('admin');
    // return fetch(`${isAdmin ? adminApiUrl : userApiUrl}${url}`, apiOptions)
    return fetch(`${userApiUrl}${url}`, apiOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}