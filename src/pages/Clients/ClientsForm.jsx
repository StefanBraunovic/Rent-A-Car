import { Form, Input, InputNumber, Button ,Select,message} from 'antd';
import { useEffect, useState } from 'react';
import { useQuery,useMutation,useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import {getAllCountries,deleteUser,createClient, getUser} from '../../services/clients'
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */
const initialData = {
  name:'',
  identification_document_no:0,
  phone_no:'',
  country_id:0,


}


const Demo = ({title,id}) => {
const [formData,setFormData] = useState();
const history = useHistory();
const queryClient = useQueryClient(initialData);
 
const {data} = useQuery('countries',getAllCountries);

  const onFinish = (data) => {
    if(title==='Add new client'){
      createClient(data)
      .then((r)=>{
        console.log(r);
        history.push('clients')
      })
      .catch((err)=>{
        console.log(err);
      })
    }else if (title === 'Edit'){
      console.log('edita');
    }
  
  };

  const onDelete = () => {
    console.log(id);
    deleteUser(id)
    .then((r)=>{
        console.log(r);
    })
    history.push('/clients') 
}

useEffect(()=>{
if(title!== 'Add new client'){
getUser(id)
.then(r=>{
  setFormData(r?.data)
    })
  }
  console.log(formData);
},[id])

 

 
  
if (title==='Delete'){
    return <div>
        <Form {...layout} name="nest-messages"  >
        <h1>{title}</h1>
      
     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
     <Button style={{display:'block'}} onClick={()=>onDelete()} type="primary" htmlType="submit">
          Delete
        </Button>
      </Form.Item>
    </Form>
    </div>
}
return (
      <Form {...layout}  onFinish={onFinish}>
        <h1>{title}</h1>
      <Form.Item
        name={'name'}
        label="First and Last name"
     type='text'
     value={formData?.name}
     onChange={(e)=> setFormData(prevState=>{
       return {
         ...prevState,
         name:e.target.value
       }
     })}
      >
          <Input />
  </Form.Item>
  <Form.Item      value={formData?.email} name={'email'} label="email">
        <Input />
      </Form.Item>
      <Form.Item
        name={'identification_document_no'}
        label="identification_document_no"
       type="number"
       value={formData?.identification_document_no}
      >
        <InputNumber  />
      </Form.Item>
      
      <Form.Item   value={formData?.phone_no} name={'phone_no'} label="phone_no">
        <Input />
      </Form.Item>
     
      <Form.Item
        name={'country_id'}
        label="country"
        value={formData?.identification_document_no}
      >
          
    <Select defaultValue='choose country' options={
                data?.data.map((country) => {
                  return { label: country.name, value: country.id };
                }) || []
              } >
     </Select>
      </Form.Item>
   
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button  type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;