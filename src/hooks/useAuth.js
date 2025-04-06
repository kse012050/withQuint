import { useEffect, useState } from "react";
import { postApi } from "../api/api";

export function useAuth(){
    const [isLogin, setIslogin] = useState(false);
    const [user, setUser] = useState();
    useEffect(()=>{
        postApi('signIn/auth')
            .then((response)=>{
                const {result, /* message, */ user, isLogin} = response || {};
                if(result){
                    // console.log(isLogin);
                    setIslogin(isLogin)
                    setUser(user)
                }
            })
    },[])

    return [isLogin, user];
}