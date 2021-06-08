import React from 'react';
import NavbarTop from '../navbarTop/navbarTop'
import SideBar from '../sider/SideBar'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const AuthLayout = ({children}) => {
    return <Layout>
        <NavbarTop/>
        <Layout>
          <Sider><SideBar/></Sider>
          <Content>{children}</Content>
        </Layout>
    </Layout>
 
      

   
   
}

export default AuthLayout;
