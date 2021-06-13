import { Form, Input, InputNumber, Button ,message} from 'antd';
import { useMutation,useQueryClient } from 'react-query';
import {deleteVehicle} from '../../services/vehicles'



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


const VehiclesForm = ({title,id}) => {
  const queryClient = useQueryClient();
  

  const onSubmit = () => {
       deleteVehicle(id)
       .then((r)=>{
           console.log(r);
       })
}
//   const {data} = useQuery('countries',getAllCountries);
if (title==='Delete'){
    return <div>
        <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
        <h1>{title}</h1>
    

        <Button onClick={()=>onSubmit()} type="primary" htmlType="submit">
          Submit
        </Button>
    
    </Form>
    </div>
}
return (
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
      <Form.Item
        name={'country'}
        label="country"
        
      >
          
    {/* <Select defaultValue='choose country' options={
                data?.data.map((country) => {
                  return { label: country.name, value: country.id };
                }) || []
              } >
     </Select> */}
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

export default VehiclesForm;