import React,{useState} from 'react'
import { Form, Input, InputNumber, Button ,message,Select,Steps} from 'antd';
import { useMutation,useQueryClient,useQuery } from 'react-query';
import {addVehicle, deleteVehicle, getVehicleType, updateVehicle} from '../../services/vehicles'
import { useForm,FormProvider,Controller } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import ImageUpload from './ImageUploadForm';

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

const VehiclesForm = ({title,vehicleId}) => {
  const history = useHistory();
  const [current, setCurrent] = React.useState(0);
  const queryClient = useQueryClient();
  const {data} = useQuery('car-types',getVehicleType);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const methods = useForm();
  const { setValue,reset, handleSubmit,control, formState: { errors } } = methods;
  


  const updateMutation = useMutation(
    ['updateMutation', vehicleId],
    (data) => updateVehicle(data, vehicleId),
    {
      onSuccess: () => {
        message.success(('successMessages.updated'));
        queryClient.refetchQueries('clients');
        // onCancel();
      },
      onError: (error) => {
     
        console.log(error.response.data.message);
      },
    }
  );

  const onSubmit = async data=>{
   
    console.log(data);
    console.log(data);
    if(title==='Add new vehicle'){
      reset();
       await addVehicle(data);
      queryClient.refetchQueries('vehicles')
    } else if (title === 'Edit'){
      await updateMutation.mutateAsync(data)
      queryClient.refetchQueries('clients');
    
      reset();
    
    }

  }
  if(title==='Edit'){
    Object.keys(vehicleId).forEach(prop=>{
      setValue(prop,vehicleId[prop])
    })
    }

  console.log(data?.data?.data);
  const onDelete = () => {
       deleteVehicle(vehicleId)
       .then((r)=>{
           console.log(r);
       })
       history.push('/vehicles') 
}
const steps = [
  {
    title: 'First',
    content: 
    <Form>
      
  
    <Form.Item
  
    span={6}
    label='Plates'
    htmlFor='plate_no'
    required={true}
    >
    <Controller
    
          name="plate_no"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <Input 
         {...field} />}
        />
  <p style={{color:'red'}}>{errors.plate_no?.type === 'required' && 'This field is required'}
  </p>
    </Form.Item>
          
  
    <Form.Item
  
    span={6}
    label='	Production Year'
    htmlFor='production_year'
    required={true}
    >
    <Controller
    
          name="production_year"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <Input 
         {...field} />}
        />
  <p style={{color:'red'}}>{errors.production_year?.type === 'required' && 'This field is required'}
  </p>
    </Form.Item>
      
    <Form.Item
        
        label="Vehicle Type"
        required={true}
      
      >
  <Controller
        name="car_type_id"
        control={control}
        rules={{ required: true}}
        render={({ field }) =>     <Select defaultValue='choose' options={
          data?.data?.data.map((car) => {
            return { label: car.name, value: car.id };
          }) || []
        }  {...field} />
}/>
<p style={{color:'red'}}>{errors.car_id?.type === 'required' && 'Please select a country' }</p>
          </Form.Item>
              <Form.Item
  
    span={6}
    label='Number of seats'
    htmlFor='no_of_seats'
    required={true}
    >
    <Controller
    
          name="no_of_seats"
          control={control}
          rules={{ required: true}}
          render={({ field }) => <Input 
         {...field} />}
        />
  <p style={{color:'red'}}>{errors.no_of_seats?.type === 'required' && 'This field is required'}
  </p>
    </Form.Item>
    <Form.Item
  
  span={6}
  label='Price/Day'
  htmlFor='price_per_day'
  required={true}
  >
  <Controller
  
        name="price_per_day"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <Input 
       {...field} />}
      />
<p style={{color:'red'}}>{errors.price_per_day?.type === 'required' && 'This field is required'}
</p>
  </Form.Item>
  <Form.Item
  
  span={6}
  label='Additional Remarks'
  htmlFor='remarks'
  required={true}
  >
  <Controller
  
        name="remarks"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <Input 
       {...field} />}
      />
<p style={{color:'red'}}>{errors.remarks?.type === 'required' && 'This field is required'}
</p>
  </Form.Item>
    </Form> ,
  },
  {
    title: 'Second',
    content:   <ImageUpload  />,
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