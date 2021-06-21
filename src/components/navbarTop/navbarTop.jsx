import React ,{useState,useEffect}from 'react';
import 'antd/dist/antd.css';
import {Link, useHistory} from 'react-router-dom';
import { Menu,Dropdown,Button,Avatar, Col,Row ,Modal} from 'antd';
import uuid from 'react-uuid'
import Title from 'antd/lib/typography'
import logo from '../../images/logo.png';
import VehiclesForm from '../../pages/Vehicles/VehiclesForm';
import ClientsForm from '../../pages/Clients/ClientsForm'
import { me } from '../../services/account';
import { auth } from '../../functions/helper';
import ChangePassword from "../changePassword/ChangePassword";

const NavbarTop = ()=>{
const history = useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [content, setContent] = useState('');
  const [userName, setUserName] = useState();
 


  const showModal = ()=>{
      
    setIsModalVisible(true);
  
  }
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(()=>{
    me().then((r)=>{
        setUserName(r.data.name)
       
      })
  })

  const menu = (
    <Menu>
    {auth().role==="Employee"?  <div><Menu.Item key={uuid()}>
      <Button style={{border:'none'}}
      onClick={() => { showModal(); setContent(
        <VehiclesForm title='Add new vehicle'/>
      ); }}
      >add new vehicle</Button>
    </Menu.Item>
      <Menu.Item key={uuid()}>
      <Button   style={{border:'none'}}
      onClick={() => { showModal(); setContent(
        <ClientsForm title='Add new client'/>
      ); }}
      >add new client</Button>
      </Menu.Item>
      <Menu.Item key={uuid()}>
      <Link to="/add-reservations">Add new reservetions</Link>
      </Menu.Item>
      <Menu.Item key={uuid()}>
        <Button key={uuid()} style={{border:'none'}}
      onClick={() => {localStorage.clear('jwt-token');history.push('/') }}
      >Logout</Button>
      </Menu.Item>
      </div> : <div>

      <Menu.Item key={uuid()}>
        <ChangePassword/>
      </Menu.Item>
      <Menu.Item key={uuid()}>
        <Button key={uuid()} style={{border:'none'}}
      onClick={() => {localStorage.clear('jwt-token');history.push('/') }}
      >Logout</Button>
      </Menu.Item>
      
      </div>
      
  }
      
    </Menu>
  );
  
    return<Row style={{padding:'0'}}>
          <Col span={6}> <Avatar style={{height:'55px' , width:'55px',}} src={logo}/>
          </Col>
          <Col span={6} ><Title style={{color:'white'}}>{userName}</Title>
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