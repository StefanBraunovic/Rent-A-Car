import React from 'react';
import {Route} from 'react-router-dom';
import Forbidden from '../pages/forbidden/Frobidden';
import AuthLayout from '../components/layout/AuthLayout';
import BasicLayout from '../components/layout/BasicLayout';
import ClientLayout from "../components/layout/ClientLayout";
import {auth} from "../functions/helper";
import ClientHome from "../pages/home/client/ClientHome";

const PrivateRoute = ({component: Component, isPrivate,path, ...rest}) => {
    const Layout = isPrivate ? auth()?.role === "Employee"?AuthLayout:ClientLayout : BasicLayout;

	if(path === '/')Component = (auth()?.role === "Employee")?AuthLayout:ClientHome;
    return <Route {...rest} component={() => {
        return isPrivate ? localStorage.getItem('jwt-token') ?
            <Layout><Component {...rest}/></Layout>
            :
            <Forbidden/>
            :
            <Layout><Component {...rest}/></Layout>
    }}/>
}

export default PrivateRoute;

