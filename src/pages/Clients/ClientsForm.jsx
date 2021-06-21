import { Form, Input,  Button ,Select} from 'antd';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup  from 'yup';
import {  useState } from 'react';
import { useQuery,useMutation,useQueryClient,  } from 'react-query';
import {getAllCountries,deleteUser,createClient,  updateClient} from '../../services/clients'
import Loader from "react-loader-spinner";
import Swal from 'sweetalert2'



const { TextArea } = Input;

const initialData = {
    
     name:'',
     identification_document_no:'',
     phone_no:0,
     country_id:'',
	 remarks:'',
}


const schema = yup.object().shape({
     name:yup.string().required() ,
     email: yup.string().email().required(),
     country_id: yup.number().required(),
     identification_document_no:yup.string().required(),
     phone_no:yup.number().required()

})


const Demo = ({title, ClientId, onSuccessCallback}) => {
     const [errorsBack, setErrors] = useState();
     const [loading,setLoading] = useState(true)
     const { handleSubmit, control, reset, setValue, formState:{ errors } } = useForm(
		 { defaultValues: {
			id:'',
	  name:'',
	  identification_document_no:'',
	  phone_no:'',
	  country_id:'',
	  remarks:'',
		  }},
          {  resolver: yupResolver(schema)}

     );

     const queryClient = useQueryClient(initialData);

     const {data} = useQuery('countries',getAllCountries);

     const updateMutation = useMutation(
          ['updateMutation', ClientId],
          (data) => updateClient(data, ClientId.user.id),
          {
               onSuccess: () => {
                    Swal.fire(
                         'Good job!',
                         'You edited  the client!',
                         'success'
                    )
                    queryClient.refetchQueries('clients');
                    // onCancel();
               },
               onError: (error) => {
                    Swal.fire(
                         'Something goes wrong!',

                         'error'
                    )

                    setErrors(error.response.data.message)
               },
          }
     );

     const onFinish = async (data) => {


          if(title==='Add new client'){
               reset();
               createClient(data)
               .then((r)=>{

                    queryClient.refetchQueries('clients');
                    onSuccessCallback();
                    Swal.fire(
                         'Good job!',
                         'You created  the client!',
                         'success'
                    )
                    setLoading(true)

               })
               .catch((err)=>{
				   Swal.fire(
					   'Something goes wrong!',
					   
					   'error'
					   )
					   setErrors(err.response.data.message)
               })
          } else if (title === 'Edit'){
               await updateMutation.mutateAsync(data)
               queryClient.refetchQueries('clients');
               onSuccessCallback();
               reset();

          }

     };

     const onDelete = () => {
      setLoading(true)
      deleteUser(ClientId.user.id)
      .then((r)=>{
           console.log(r);
           queryClient.refetchQueries('clients');
           onSuccessCallback();
		   Swal.fire(
				'You deleted  the client!',
	   )
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
<p style={{color:'red'}}>{errorsBack === 'The email has already been taken.' ? 'The email has already been taken.' : '' }</p>
<p style={{color:'red'}}>{errors.email?.type === 'required' && 'This field is required' }</p>
<p style={{color:'red'}}>{errors.email?.message }</p>
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
<p style={{color:'red'}}>{errors.identification_document_no?.message ? 'ID or Passport must be a number' : '' }</p>
<p style={{color:'red'}}>{errorsBack === 'The identification document no has already been taken.' ? 'The identification document no has already been taken.' : '' }</p>
<p style={{color:'red'}}>{errorsBack === 'The identification document no must only contain letters and numbers.' ? 'The identification document no must only contain letters and numbers..' : '' }</p>


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
<p style={{color:'red'}}>{errors.phone_no?.message ? 'Phone must be a number' : ''
}</p>

     </Form.Item>

     <Form.Item
     label='Remarks'
     htmlFor='remarks'
     required={true}


      >
     <Controller
                    name="remarks"
                    control={control}
                    rules={{ required: true}}
                    render={({ field }) => <Input.TextArea {...field} />}
               />
<p style={{color:'red'}}>{errors.remarks?.type === 'required' && 'This field is required' }</p>

     </Form.Item>

               <input type="submit" />

               {loading===false? <Loader/> : ''}
          </Form>
     );
};

export default Demo;