import { Form, Input, InputNumber, Button ,message,Select} from 'antd';
import { useMutation,useQueryClient } from 'react-query';
import {deleteVehicle} from '../../services/vehicles'

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


const VehiclesForm = ({title,id}) => {
  const queryClient = useQueryClient();
  

  const onDelete = () => {
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
    

        <Button onClick={()=>onDelete()} type="primary" htmlType="submit">
          Submit
        </Button>
    
    </Form>
    </div>
}
return (
      <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
        <h1>{title}</h1>
      <Form.Item
        name={'plate_no'}
        label="Plates"
     
      >
          
        <Input type='number'/>
      </Form.Item>
      <Form.Item
        name={'production_year'}
        label="Production Year"
        
      >
        <Input type='number'/>
      </Form.Item>
      <Form.Item
        name={'car_type_id'}
        label="Vehicle Type"
      >
       <Select >
        <Option>Small</Option>
        <Option>Medium</Option>
        <Option>Large</Option>
       </Select>
      </Form.Item>
      <Form.Item name={'no_of_seats'} label="Seats">
        <Input />
      </Form.Item>
      <Form.Item name={'price_per_day'} label="Price/Day">
        <Input />
      </Form.Item>
      <Form.Item name={'remarks'} label="Additional Remarks">
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