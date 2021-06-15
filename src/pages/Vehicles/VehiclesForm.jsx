import React,{useState} from 'react'
import { Form, Input, InputNumber, Button ,message,Select,Steps} from 'antd';
import { useMutation,useQueryClient,useQuery } from 'react-query';
import {addVehicle, deleteVehicle, getVehicleType} from '../../services/vehicles'
import { useForm,FormProvider } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import Test from './ImageUploadForm'
import ImageUploadForm from './ImageUploadForm';

// const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const { Step } = Steps;

const VehiclesForm = ({title,id, visible}) => {
  const history = useHistory();
  const [formData,setFormdata] = useState();
  const [current, setCurrent] = React.useState(0);
  const queryClient = useQueryClient();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const methods = useForm();
  const { register, handleSubmit, watch, formState: { errors } } = methods;
  const [fileList, setFileList] = useState([]);
  const onSubmit = (data)=>{
    addVehicle(data)
    console.log(data);

  }
  const {data} = useQuery('car-types',getVehicleType);

  console.log(data?.data?.data);
  const onDelete = () => {
       deleteVehicle(id)
       .then((r)=>{
           console.log(r);
       })
       history.push('/vehicles') 
}
const steps = [
  {
    title: 'First',
    content:  <form style={{display:'grid',width:'250px', margin:'auto'}} >
    <label htmlFor="plate_no">Plates</label>
    <input type='number' name='plate_no' defaultValue="test" {...register("plate_no")} />
    <label htmlFor="plate_no">Production Year</label>
    <input type='number' name='production_year' defaultValue="test" {...register("production_year")} />
    <label htmlFor="plate_no">Vehicle Type</label>
    <select name='car_type_id' {...register("car_type_id")}>
    {data?.data?.data.map(car => {
             return <option value={car.id}>{car.name}</option>
              }) 
            }
    </select>
    <label htmlFor="no_of_seats">Seats</label>
    <input type='number' name='no_of_seats' defaultValue="test" {...register("no_of_seats")} />
    <label htmlFor="price_per_day">Price/Day</label>
    <input type='number' name='price_per_day' defaultValue="test" {...register("price_per_day")} />
    <label htmlFor="remarks">Additional Remarks</label>
    <textarea id="remarks" name="remarks"  {...register("remarks")} rows="4" cols="50">

      </textarea>
    {/* errors will return when field validation fails  */}
    {errors.exampleRequired && <span>This field is required</span>}
    
  
  </form>,
  },
  {
    title: 'Second',
    content:   <ImageUploadForm  fileList={fileList}/>,
  },
];


if (title==='Delete'){
    return <div>
        <Form {...layout} name="nest-messages"  
        >
        <h1>{title}</h1>
  <Button style={{display:'block'}} onClick={()=>onDelete()} type="primary" htmlType="submit">
          Submit
        </Button>
    </Form>
    </div>
}
return (
  <FormProvider {...methods}>
    <form action=" 
    " onSubmit={handleSubmit(onSubmit)}>

<Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="secondary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      <input type="submit"   />
      </div>
    </form>
  
    </FormProvider>
  );
};

export default VehiclesForm;