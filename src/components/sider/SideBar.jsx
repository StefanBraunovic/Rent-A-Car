import React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom';
import uuid from 'react-uuid'
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,

    TeamOutlined,
   
  } from '@ant-design/icons';

 const {  Sider } = Layout;


const SideBar = ()=>{

   const [collapsed,setCollapsed]=useState(true) 

   const onCollapse = (collapsed)=>{
    setCollapsed(collapsed);
 
   }

    return <Layout style={{ minHeight: '100vh', minWidth:'100px' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key={uuid()}icon={<TeamOutlined />} >
        <Link to="/clients">Clients</Link>
        </Menu.Item>
        <Menu.Item key={uuid()}icon={<DesktopOutlined />} >
        <Link to="/vehicles">Clients</Link>
        </Menu.Item>
   
      </Menu>
    </Sider>
  </Layout>
        


  



}

export default SideBar