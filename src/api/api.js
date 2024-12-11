const userApiUrl =  process.env.REACT_APP_API_URL;

export function isSubmit(inputs){
    if(inputs){
        Object.entries(inputs).forEach(([key, value]) =>{
            document.querySelector(`[name="${key}"]`) && 
                document.querySelectorAll(`[name="${key}"]`).forEach((prev)=>{
                    if ((prev.type === 'checkbox' && value === 'n') || value === '') {
                        prev.classList.add('error');
                    }
                })
        })

        return Object.entries(inputs).some(([key, value]) => {
            if (!value && document.querySelector(`[name="${key}"][required]`)) {
                document.querySelector(`[name="${key}"]`).focus()
                return true; 
            }
            return false;
        });
    }
}

function apiOption(type, data){
    return {
        method: type,
        headers: {"Content-Type": "application/json",},
        credentials: 'include',
        body: JSON.stringify(data)
    }
}

export function postApi(url, data){
    const options = apiOption('POST', data);
    return userApi(url, options)
    // return fetch(`${userApiUrl}${url}`, options)
    //         .then(response => response.json())
    //         .catch(error => console.log('error', error));
}

function userApi(url, apiOptions){
    return fetch(`${userApiUrl}${url}`, apiOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}