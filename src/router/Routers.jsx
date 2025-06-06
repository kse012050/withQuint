import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from '../pages/Root';
import Main from '../pages/Main';
import Introduction from '../pages/Introduction';
import VipProduct from '../pages/VipProduct';
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
import Find from '../pages/Find';
import FindId from '../pages/FindId';
import FindPW from '../pages/FindPW';
import InfoChange from '../pages/InfoChange';
import Test from '../pages/Test';
import NotFound from '../pages/NotFound';
// 관리자
import AdminRoot from '../pages/admin/Root';
import AdminSignIn from '../pages/admin/SignIn';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUser from '../pages/admin/User';
import AdminUserDetail from '../pages/admin/UserDetail';
import AdminRecommendation from '../pages/admin/Recommendation';
import AdminRevenue from '../pages/admin/Revenue';
import AdminStock from '../pages/admin/Stock';
import AdminCustomerVip from '../pages/admin/CustomerVip';
import AdminCustomerClinic from '../pages/admin/CustomerClinic';
import AdminVipProduct from '../pages/admin/VipProduct';
import AdminVipProductWrite from '../pages/admin/VipProductWrite';
import AdminCustomerNotice from '../pages/admin/CustomerNotice';
import AdminBoardWrite from '../pages/admin/BoardWrite';

export default function Routers() {
    return (
        <Routes>
            <Route element={<Root />}>
                <Route path="/" element={<Main />} />
                <Route path="/introduction" element={<Introduction />} />
                <Route path="/vipProduct" element={<VipProduct />} />
                <Route path="/recommendation" element={<Recommendation />} />
                <Route path="/revenue" element={<Revenue />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/customer" element={<Customer />}>
                    <Route path='vip' element={<CustomerVip />} />
                    <Route path='clinic' element={<CustomerClinic />} />
                    <Route path='notice' element={<CustomerNotice />} />
                    <Route path=":boardType/:id" element={<Detail />} />
                    <Route path=':boardType/create' element={<CustomerWrite />} /> 
                    <Route path=":boardType/:id/update" element={<CustomerWrite />} />
                </Route>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/find" element={<Find />}>
                    <Route path='id' element={<FindId />} />
                    <Route path='pw' element={<FindPW />} />
                </Route>
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/infoChange" element={<InfoChange />} />
                <Route path="/:boardType/:id" element={<Detail />} />
            </Route>
            <Route path="/test" element={<Root />}>
                <Route index={true} element={<Test />}/>
            </Route>
            {/* 관리자 */}
            <Route path="/admin">
                <Route index={true} element={<AdminSignIn />}/>
                <Route element={<AdminRoot />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="user/:id" element={<AdminUserDetail />} />
                    <Route path="recommendation" element={<AdminRecommendation />} />
                    <Route path="revenue" element={<AdminRevenue />} />
                    <Route path="stock" element={<AdminStock />} />
                    <Route path="vip" element={<AdminCustomerVip />} />
                    <Route path="clinic" element={<AdminCustomerClinic />} />
                    <Route path="notice" element={<AdminCustomerNotice />} />
                    <Route path="vipProduct" element={<AdminVipProduct />} />
                    <Route path=":boardType/create" element={<AdminBoardWrite />} />
                    <Route path=":boardType/:id" element={<AdminBoardWrite />} />
                    <Route path="vipProduct/create" element={<AdminVipProductWrite />} />
                    <Route path="vipProduct/:id" element={<AdminVipProductWrite />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

