import React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom';
import uuid from 'react-uuid'
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,

    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';


  const {  Sider } = Layout;
const { SubMenu } = Menu;








const SideBar = ()=>{

   const [collapsed,setCollapsed]=useState(true) 

   const onCollapse = (collapsed)=>{
    setCollapsed(collapsed);
    console.log(collapsed);
   }

    return <Layout style={{ minHeight: '100vh', minWidth:'100px' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key={uuid()}icon={<TeamOutlined />} title="User">
        <Link to="/clients">Clients</Link>
        </Menu.Item>
        <Menu.Item key={uuid()}icon={<DesktopOutlined />} title="User">
          Option 2
        </Menu.Item>
        <SubMenu key={uuid()} icon={<UserOutlined />} title="User">
          <Menu.Item key={uuid()}>Tom</Menu.Item>
          <Menu.Item key={uuid()}>Bill</Menu.Item>
          <Menu.Item key={uuid()}>Alex</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  </Layout>
        


  



}

export default SideBar