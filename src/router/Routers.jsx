import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from '../pages/Root';
import Main from '../pages/Main';
import Introduction from '../pages/Introduction';
import Vip from '../pages/Vip';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index={true} element={<Main/>} />
            </Route>
            <Route path="/introduction" element={<Root />}>
                <Route index={true} element={<Introduction />}/>
            </Route>
            <Route path="/vip" element={<Root />}>
                <Route index={true} element={<Vip />}/>
            </Route>
            <Route path="/signIn" element={<Root />}>
                <Route index={true} element={<SignIn />}/>
            </Route>
            <Route path="/signUp" element={<Root />}>
                <Route index={true} element={<SignUp />}/>
            </Route>
        </Routes>
    );
}

