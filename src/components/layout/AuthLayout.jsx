import React from 'react';
import NavbarTop from '../navbarTop/navbarTop';
import SiderDemo from '../sider/SideBar';
import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

const AuthLayout = ({children}) => {
  return (
    <Layout>
      <Header>
        <NavbarTop />
      </Header>
      <Layout>
        <SiderDemo />
        <Content style={{padding: '40px'}}>{children}</Content>
      </Layout>
      <Footer style={{textAlign: 'center'}}>Amplitudo Academy 2020/2021</Footer>
    </Layout>
  );
};

export default AuthLayout;
