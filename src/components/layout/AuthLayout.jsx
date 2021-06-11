import React from 'react';
import NavbarTop from '../navbarTop/navbarTop'
import SiderDemo from '../sider/SideBar'
import {  Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const AuthLayout = ({children}) => {
    return <Layout>
        <Header><NavbarTop/></Header>
      <Layout>
      <Sider><SiderDemo/></Sider>
        <Content>{children}</Content>
      </Layout>
        <Footer style={{textAlign:'center'}}>Footer</Footer>
    </Layout>
       
   
}

export default AuthLayout;
