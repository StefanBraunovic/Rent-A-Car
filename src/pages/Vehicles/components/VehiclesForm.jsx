import React, {memo, useState} from 'react';
import {Form, Input, Button, message, Select, Steps} from 'antd';
import {useMutation, useQueryClient, useQuery} from 'react-query';
import {
  addVehicle,
  deleteVehicle,
  getVehicleType,
  updateVehicle,
} from '../../../services/vehicles';
import {useForm, FormProvider, Controller} from 'react-hook-form';
import {useHistory} from 'react-router-dom';
import ImageUpload from './ImageUploadForm';
import Swal from 'sweetalert2';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const {Step} = Steps;

const VehiclesForm = ({title, vehicleId}) => {
  const history = useHistory();
  const [current, setCurrent] = React.useState(0);
  const queryClient = useQueryClient();
  const {data: carTypes} = useQuery('car-types', getVehicleType);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const methods = useForm(
    title === 'Edit'
      ? {
          defaultValues: {
            photos: vehicleId.photos,
            plate_no: vehicleId.plate_no,
            production_year: vehicleId.production_year,
            no_of_seats: vehicleId.no_of_seats,
            car_type_id: vehicleId.car_type_id,
            name: vehicleId.name,
            price_per_day: vehicleId.price_per_day,
            remarks: vehicleId.remarks,
          },
        }
      : {},
  );
  const {
    setValue,
    reset,
    handleSubmit,
    control,
    formState: {errors},
  } = methods;
  const [errorsBack, setErrors] = useState();

  const updateMutation = useMutation(
    ['updateMutation', vehicleId?.id],
    data => updateVehicle(data, vehicleId?.id),
    {
      onSuccess: () => {
        message.success('successMessages.updated');
        queryClient.refetchQueries('vehicles');
        history.push('vehicles');
      },
      onError: error => {
        setErrors(error.response.data.message);
      },
    },
  );

  const onSubmit = async data => {
    if (title === 'Add new vehicle') {
      reset();
      await addVehicle(data)
        .then(r => {
          Swal.fire('Good job!', 'You created the vehicle  !', 'success');
          queryClient.refetchQueries('vehicles');
          history.push('/vehicles');
        })
        .catch(err => {
          setErrors(err.response.data.message);
        });
      queryClient.refetchQueries('vehicles');
    } else if (title === 'Edit') {
      await updateMutation.mutateAsync(data);
      queryClient.refetchQueries('vehicles');

      reset();
    }
  };

  const onDelete = () => {
    deleteVehicle(vehicleId).then(r => {});
    history.push('/vehicles');
  };
  const steps = [
    {
      title: 'First',
      content: (
        <Form>
          <Form.Item span={6} label="Plates" htmlFor="plate_no" required={true}>
            <Controller
              name="plate_no"
              control={control}
              rules={{required: true, minLength: 7}}
              render={({field}) => <Input {...field} />}
            />
            <p style={{color: 'red'}}>
              {errors.plate_no?.type === 'required' && 'This field is required'}
            </p>
            <p style={{color: 'red'}}>
              {errors.plate_no?.type === 'minLength' &&
                'The minimum character is seven'}
            </p>
          </Form.Item>

          <Form.Item
            span={6}
            label="	Production Year"
            htmlFor="production_year"
            required={true}>
            <Controller
              name="production_year"
              control={control}
              rules={{required: true, min: 1950, max: 2021}}
              render={({field}) => <Input {...field} />}
            />
            <p style={{color: 'red'}}>
              {errors.production_year?.type === 'required' &&
                'This field is required'}
            </p>
            <p style={{color: 'red'}}>
              {errors.production_year?.type === 'min' &&
                'the minimum year is 1950'}
            </p>
            <p style={{color: 'red'}}>
              {errors.production_year?.type === 'max' &&
                'the maximum year is 2021'}
            </p>
          </Form.Item>

          <Form.Item label="Vehicle Type" required={true}>
            <Controller
              name="car_type_id"
              control={control}
              rules={{required: true}}
              render={({field}) => (
                <Select
                  options={
                    carTypes?.data?.data.map(car => {
                      return {label: car.name, value: car.id};
                    }) || []
                  }
                  {...field}
                />
              )}
            />
            <p style={{color: 'red'}}>
              {errors.car_id?.type === 'required' && 'Please select a country'}
            </p>
          </Form.Item>
          <Form.Item
            span={6}
            label="Number of seats"
            htmlFor="no_of_seats"
            required={true}>
            <Controller
              name="no_of_seats"
              control={control}
              rules={{required: true, max: 5, min: 2}}
              render={({field}) => <Input type="number" {...field} />}
            />
            <p style={{color: 'red'}}>
              {errors.no_of_seats?.type === 'required' &&
                'This field is required'}
            </p>
            <p style={{color: 'red'}}>
              {errors.no_of_seats?.type === 'max' &&
                'The maximum seats is five'}
            </p>
            <p style={{color: 'red'}}>
              {errors.no_of_seats?.type === 'min' &&
                'The minimal seats is five'}
            </p>
          </Form.Item>
          <Form.Item
            span={6}
            label="Price/Day"
            htmlFor="price_per_day"
            required={true}>
            <Controller
              name="price_per_day"
              control={control}
              rules={{required: true, max: 500, min: 40}}
              render={({field}) => <Input {...field} />}
            />
            <p style={{color: 'red'}}>
              {errors.price_per_day?.type === 'required' &&
                'This field is required'}
            </p>
            <p style={{color: 'red'}}>
              {errors.price_per_day?.type === 'max' &&
                'Maximum price per day is 500€'}
            </p>
            <p style={{color: 'red'}}>
              {errors.price_per_day?.type === 'min' &&
                'Minimum price per day is 40€'}
            </p>
          </Form.Item>
          <Form.Item
            span={6}
            label="Additional Remarks"
            htmlFor="remarks"
            required={true}>
            <Controller
              name="remarks"
              control={control}
              rules={{required: true}}
              render={({field}) => <Input {...field} />}
            />
            <p style={{color: 'red'}}>
              {errors.remarks?.type === 'required' && 'This field is required'}
            </p>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Second',
      content: <ImageUpload />,
    },
  ];

  if (title === 'Delete') {
    return (
      <div>
        <Form {...layout} name="nest-messages">
          <h1>{title}</h1>
          <Button
            style={{display: 'block'}}
            onClick={() => onDelete()}
            type="primary"
            htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Steps style={{padding: '20px'}} current={current}>
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
            <Button style={{margin: '0 8px'}} onClick={() => prev()}>
              Previous
            </Button>
          )}
          <input style={{float: 'right'}} type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default memo(VehiclesForm);
