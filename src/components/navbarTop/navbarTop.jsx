import React ,{useState}from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';
import { Menu,Dropdown,Button,Avatar, Col,Row ,Modal} from 'antd';
import uuid from 'react-uuid'
import Title from 'antd/lib/typography'
import logo from '../../images/logo.png';
import VehiclesForm from '../../pages/Vehicles/VehiclesForm';
import ClientsForm from '../../pages/Clients/ClientsForm'

const NavbarTop = ()=>{

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [content, setContent] = useState('');


  const showModal = ()=>{
      
    setIsModalVisible(true);
  
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const menu = (
    <Menu>
      <Menu.Item key={uuid()}>
      <Button style={{border:'none'}}
      onClick={() => { showModal(); setContent(
        <VehiclesForm title='Add new vehicle'/>
      ); }}
      >add new vehicle</Button>
    </Menu.Item>
      <Menu.Item key={uuid()}>
      <Button style={{border:'none'}}
      onClick={() => { showModal(); setContent(
        <ClientsForm title='Add new client'/>
      ); }}
      >add new client</Button>
      </Menu.Item>
      <Menu.Item key={uuid()}>
      <Link to="/new_reservations">Add new reservetions</Link>
      </Menu.Item>
      <Menu.Item key={uuid()}>
      <Link to="/new_reservations">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  
    return<Row style={{padding:'0'}}>
          <Col span={6}> <Avatar src={logo}/></Col>
          <Col span={6}><Title style={{color:'white'}}>Marko</Title>
          </Col>
         
          <Col  span={12}> 
        <Dropdown align='end'  overlay={menu}  >
        <Button style={{float:'right', margin:'20px 0 0 1px'}}  >Menu</Button>
      </Dropdown></Col>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
       {content}
      </Modal>
        </Row>
        
}

export default NavbarTop