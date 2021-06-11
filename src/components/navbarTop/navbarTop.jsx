import React from 'react';

import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import { Menu,Dropdown,Button,Avatar, Col,Row } from 'antd';
import Title from 'antd/lib/typography'

import logo from '../../images/logo.png';



// const { Header} = Layout;
const menu = (
  <Menu>
   
    <Link to="/new_user">Add new user</Link>
   
   
    <Link to="/new_vheicles">Add new vheicles</Link>
   
   
    <Link to="/new_reservations">Add new reservetions</Link>
   
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