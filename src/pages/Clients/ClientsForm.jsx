import { Form, Input, InputNumber, Button ,Select,message} from 'antd';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup  from 'yup';
import { useEffect, useState } from 'react';
import { useQuery,useMutation,useQueryClient,  } from 'react-query';
import { useHistory } from 'react-router-dom';
import {getAllCountries,deleteUser,createClient, getUser, updateClient} from '../../services/clients'

const { Option } = Select;
const { TextArea } = Input;
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
  id:'',
  name:'',
  identification_document_no:'',
  phone_no:0,
  country_id:'',
}


const schema = yup.object().shape({
  name:yup.string().required(),
  email: yup.string().email().required(),
  country_id: yup.number().required(),
  identification_document_no:yup.number().required(),
  phone_no:yup.number().required()
  
})


const Demo = ({title, ClientId, onSuccessCallback}) => {

  const { handleSubmit, control, reset, setValue, formState:{ errors } } = useForm(
    {
      defaultValues: {
        id:'',
  name:'',
  identification_document_no:'',
  phone_no:'',
  country_id:'',
      }
    },
    {  resolver: yupResolver(schema)}
    
  );
  
  const [formData,setFormData] = useState('');
  const history = useHistory();
  const queryClient = useQueryClient(initialData);
  
  const {data} = useQuery('countries',getAllCountries);

  const updateMutation = useMutation(
    ['updateMutation', ClientId],
    (data) => updateClient(data, ClientId),
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

  const onFinish = async (data) => {

    console.log(data);
    if(title==='Add new client'){
      reset();
      createClient(data)
      .then((r)=>{
        console.log(r);
        queryClient.refetchQueries('clients');
        onSuccessCallback();
      })
      .catch((err)=>{
        console.log(err);
      })
    } else if (title === 'Edit'){
      await updateMutation.mutateAsync(data)
      queryClient.refetchQueries('clients');
      onSuccessCallback();
      reset();
      console.log(formData);
    }
  
  };

  const onDelete = () => {
    // console.log(id);
    deleteUser(ClientId.id)
    .then((r)=>{
        console.log(r);
        queryClient.refetchQueries('clients');
        onSuccessCallback();
    })
}

if(title==='Edit'){
Object.keys(ClientId).forEach(prop=>{
  setValue(prop,ClientId[prop])
})
}

 

 
  
if (title==='Delete'){
    return <div>
       
          <div><h3>Are you sure to delete {ClientId.name}?</h3>
          </div>
     
     <Button style={{display:'block'}} onClick={()=>onDelete()} type="primary" htmlType="submit">
          Delete
        </Button>

    </div>
}
return ( 
<Form onFinish={handleSubmit(onFinish) }>
  
  <Form.Item
  
  span={6}
  label='First and Last name'
  htmlFor='name'
  required={true}
  >
  <Controller
  
        name="name"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <Input 
       {...field} />}
      />
<p style={{color:'red'}}>{errors.name?.type === 'required' && 'This field is required'}
</p>
  </Form.Item>
    <Form.Item
  label='Email'
  htmlFor='email'
  required={true}
 
   >
  <Controller
        name="email"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <Input  {...field} />}
      />
<p style={{color:'red'}}>{errors.email?.type === 'email' && 'Please enter a valid email' }</p>
<p style={{color:'red'}}>{errors.email?.type === 'required' && 'This field is required' }</p>
  </Form.Item>
  <Form.Item
        
        label="Country"
        required={true}
      
      >
  <Controller
        name="country_id"
        control={control}
        rules={{ required: true}}
        render={({ field }) =>     <Select defaultValue='choose country' options={
          data?.data.map((country) => {
            return { label: country.name, value: country.id };
          }) || []
        }  {...field} />
}/>
<p style={{color:'red'}}>{errors.country_id?.type === 'required' && 'Please select a country' }</p>
          </Form.Item>
          <Form.Item
  label='ID or Passport'
  htmlFor='identification_document_no'
  required={true}
  

   >
  <Controller
        name="identification_document_no"
        control={control}
        
        rules={{ required: true}}
        render={({ field }) => <Input  {...field} />}
      />
<p style={{color:'red'}}>{errors.identification_document_no?.type === 'required' && 'This field is required' }</p>
{/* <p style={{color:'red'}}>{errors.identification_document_no?.type === 'required' && 'This field is required' }</p> */}
  </Form.Item>
  <Form.Item
  label='Phone'
  htmlFor='phone_no'
  required={true}
  
 
   >
  <Controller
        name="phone_no"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <Input  {...field} />}
      />
<p style={{color:'red'}}>{errors.phone_no?.type === 'required' && 'This field is required' }</p>

  </Form.Item>

  {/* <Form.Item
  label='Remarks'
  htmlFor='remarks'
  required={true}
  
 
   >
  <Controller
        name="remarks"
        control={control}
        rules={{ required: true}}
        render={({ field }) => <TextArea  {...field} />}
      />
<p style={{color:'red'}}>{errors.phone_no?.type === 'required' && 'This field is required' }</p>

  </Form.Item> */}
  
      <input type="submit" />
    </Form>
  );
};

export default Demo;