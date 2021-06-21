import React from 'react';
import {Layout} from 'antd';
import NavbarTop from '../navbarTop/navbarTop';
import ClientHome from '../../pages/home/client/ClientHome';

const {Content, Header} = Layout;

const ClientLayout = ({children}) => {
  return (
    <div>
      <Layout>
        <Header>
          <NavbarTop />
        </Header>
        <Content style={{minHeight: '100vh'}}>
          <ClientHome />
        </Content>
      </Layout>
    </div>
  );
};

export default ClientLayout;
