import React from 'react';
import {Route} from 'react-router-dom';
import Forbidden from '../pages/forbidden/Frobidden';
import AuthLayout from '../components/layout/AuthLayout';
import BasicLayout from '../components/layout/BasicLayout';

const PrivateRoute = ({component: Component, isPrivate, ...rest}) => {
    const Layout = isPrivate ? AuthLayout : BasicLayout;

    return <Route {...rest} component={() => {
        return isPrivate ? localStorage.getItem('role') ?
            <Layout><Component {...rest}/></Layout>
            :
            <Forbidden/>
            :
            <Layout><Component {...rest}/></Layout>
    }}/>
}

export default PrivateRoute;