import React from 'react';
import {useState} from 'react'
import {Link} from 'react-router-dom';
import uuid from 'react-uuid'
import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    CarOutlined,
    TeamOutlined,
   
  } from '@ant-design/icons';

 const {  Sider } = Layout;


const SideBar = ()=>{

   const [collapsed,setCollapsed]=useState(true) 

   const onCollapse = (collapsed)=>{
    setCollapsed(collapsed);
 
   }

    return <Sider style={{minHeight:'100vh'}}   breakpoint="lg"
      collapsedWidth="0" collapsible onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" mode="inline">
        <Menu.Item key={uuid()}icon={<TeamOutlined />} >
        <Link to="/clients">Clients</Link>
        </Menu.Item>
        <Menu.Item key={uuid()}icon={<CarOutlined />} >
        <Link to="/vehicles">Vehicles</Link>
        </Menu.Item>
        <Menu.Item key={uuid()}icon={<DesktopOutlined />} >
        <Link to="/reservations">Reservations</Link>
        </Menu.Item>
   
      </Menu>
    </Sider>
}

export default SideBar