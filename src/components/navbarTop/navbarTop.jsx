import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import { Menu,Dropdown,Button,Avatar, Col,Row } from 'antd';
import uuid from 'react-uuid'
import Title from 'antd/lib/typography'
import logo from '../../images/logo.png';



const menu = (
  <Menu>
    <Menu.Item key={uuid()}>
    <Link to="/new_user">Add new user</Link>
    Add new user
  </Menu.Item>
    <Menu.Item key={uuid()}>
   <Link to="/new_vehicles">Add new vheicles</Link>
    </Menu.Item>
    <Menu.Item key={uuid()}>
    <Link to="/new_reservations">Add new reservetions</Link>
    </Menu.Item>
    <Menu.Item key={uuid()}>
    <Link to="/new_reservations">Logout</Link>
    </Menu.Item>
  </Menu>
);


const NavbarTop = ()=>{
    return<Row style={{padding:'0'}}>
          <Col span={6}> <Avatar src={logo}/></Col>
          <Col span={6}><Title style={{color:'white'}}>Marko</Title>
          </Col>
         
          <Col  span={12}> 
        <Dropdown align='end'  overlay={menu}  >
        <Button style={{float:'right', margin:'20px 0 0 1px'}}  >Menu</Button>
      </Dropdown></Col>
        </Row>
}

export default NavbarTop