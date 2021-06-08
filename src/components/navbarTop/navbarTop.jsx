import React from 'react';

import 'antd/dist/antd.css';
import {Link, useHistory} from 'react-router-dom';
import {Layout, Menu,Dropdown,Button,Avatar, Col,Row } from 'antd';
import Title from 'antd/lib/typography'

import logo from '../../images/logo.png';



const { Header} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
    <Link to="/new_user">Add new user</Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/new_vheicles">Add new vheicles</Link>
    </Menu.Item>
    <Menu.Item>
    <Link to="/new_reservations">Add new reservetions</Link>
    </Menu.Item>
  </Menu>
);


const NavbarTop = ()=>{
    return <Layout className="layout">
      <Header>
        <Row justify='center' align="center">
          <Col flex='100px'> <Avatar src={logo}/></Col>
          <Col flex='200px'><Title style={{color:'white'}}>Naziv Zaposlenog</Title></Col>
         
          <Col  flex='auto' > 
        <Dropdown   overlay={menu}  >
        <Button  style={{float:'right'}} >Menu</Button>
      </Dropdown>
      <Link  to="/new_reservations">Logout</Link>
      </Col>
    
        </Row>
       </Header>
    </Layout>
}

export default NavbarTop