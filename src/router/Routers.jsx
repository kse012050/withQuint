import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from '../pages/Root';
import Main from '../pages/Main';
import Introduction from '../pages/Introduction';
import Vip from '../pages/Vip';
import Recommendation from '../pages/Recommendation';
import Revenue from '../pages/Revenue';
import Stock from '../pages/Stock';
import Customer from '../pages/Customer';
import CustomerVip from '../pages/CustomerVip';
import CustomerClinic from '../pages/CustomerClinic';
import CustomerNotice from '../pages/CustomerNotice';
import CustomerWrite from '../pages/CustomerWrite';
import Detail from '../pages/Detail';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Test from '../pages/Test';
// 관리자
import AdminRoot from '../pages/admin/Root';
import AdminSignIn from '../pages/admin/SignIn';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminMember from '../pages/admin/Member';
import AdminVip from '../pages/admin/Vip';
import AdminRecommendation from '../pages/admin/Recommendation';
import AdminRevenue from '../pages/admin/Revenue';
import AdminStock from '../pages/admin/Stock';
import AdminCustomerClinic from '../pages/admin/CustomerClinic';
import AdminCustomerNotice from '../pages/admin/CustomerNotice';
import AdminCustomerVip from '../pages/admin/CustomerVip';

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
            <Route path="/recommendation" element={<Root />}>
                <Route index={true} element={<Recommendation />}/>
            </Route>
            <Route path="/revenue" element={<Root />}>
                <Route index={true} element={<Revenue />}/>
            </Route>
            <Route path="/stock" element={<Root />}>
                <Route index={true} element={<Stock />}/>
            </Route>
            <Route path="/customer" element={<Root />}>
                <Route element={<Customer />}>
                    {/* <Route index={true} element={<CustomerVip />} /> */}
                    <Route path='vip' element={<CustomerVip />} />
                    <Route path='clinic' element={<CustomerClinic />} />
                    <Route path='notice' element={<CustomerNotice />} />
                    <Route path=":boardType/:id" element={<Detail />} />
                    <Route path=':boardType/create' element={<CustomerWrite />} /> 
                    <Route path=":boardType/:id/update" element={<CustomerWrite />} />
                </Route>
            </Route>
            <Route path="/signIn" element={<Root />}>
                <Route index={true} element={<SignIn />}/>
            </Route>
            <Route path="/signUp" element={<Root />}>
                <Route index={true} element={<SignUp />}/>
            </Route>
            <Route path="/test" element={<Root />}>
                <Route index={true} element={<Test />}/>
            </Route>
            <Route path="/:boardType/:id" element={<Root />}>
                <Route index={true} element={<Detail />}/>
            </Route>
            {/* 관리자 */}
            <Route path="/admin">
                <Route index={true} element={<AdminSignIn />}/>
                <Route element={<AdminRoot />}>
                    <Route path="dashboard" element={<AdminDashboard />}></Route>
                    <Route path="member" element={<AdminMember />}></Route>
                    <Route path="vip" element={<AdminVip />}></Route>
                    <Route path="recommendation" element={<AdminRecommendation />}></Route>
                    <Route path="revenue" element={<AdminRevenue />}></Route>
                    <Route path="stock" element={<AdminStock />}></Route>
                    <Route path="customerClinic" element={<AdminCustomerClinic />}></Route>
                    <Route path="customerNotice" element={<AdminCustomerNotice />}></Route>
                    <Route path="customerVip" element={<AdminCustomerVip />}></Route>
                </Route>
            </Route>
        </Routes>
    );
}

