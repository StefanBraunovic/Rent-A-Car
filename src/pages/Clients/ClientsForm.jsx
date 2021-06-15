import { Form, Input, InputNumber, Button ,Select,message} from 'antd';
import { useEffect, useState } from 'react';
import { useQuery,useMutation,useQueryClient } from 'react-query';
import {getAllCountries,deleteUser} from '../../services/clients'
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
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const Demo = ({title}) => {
  const onFinish = (values) => {
    console.log(values);
  };
  const queryClient = useQueryClient();
 
  const {data} = useQuery('countries',getAllCountries);
  
if (title==='Delete'){
    return <div>
        <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
        <h1>{title}</h1>
      <Form.Item
        name={'name'}
        label="First and Last name"
        rules={[
          {
            type: 'name',
          },
        ]}
      > 
      <Input />
      </Form.Item>
     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button  type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
}
return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <h1>{title}</h1>
      <Form.Item
        name={'name'}
        label="First and Last name"
        rules={[
          {
            type: 'name',
          },
        ]}
      >
          
        <Input />
      </Form.Item>
      <Form.Item
        name={'country'}
        label="country"
        
      >
          
    <Select defaultValue='choose country' options={
                data?.data.map((country) => {
                  return { label: country.name, value: country.id };
                }) || []
              } >
     </Select>
      </Form.Item>
      <Form.Item
        name={'identification_document_no'}
        label="identification_document_no"
        rules={[
          {
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={'phone_no'} label="phone_no">
        <Input />
      </Form.Item>
      <Form.Item name={'email'} label="email">
        <Input />
      </Form.Item>
     
   
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;