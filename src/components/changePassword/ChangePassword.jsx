import {useEffect, useState} from 'react';
import {Modal, Button, Form} from 'antd';
import {SaveOutlined} from '@ant-design/icons';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import FormInput from '../formInput/FormInput';
import {changePassword} from '../../services/account';

const password_roules = yup
  .string()
  .required('required')
  .min(4, 'Password is too short - should be 4 chars minimum.')
  .max(12, 'Password is too long - should be 12 chars maximum.')
  .matches(
    /^[a-zA-Z0-9!#%&]*$/g,
    'Password can only contain Latin letters, numbers and chars(!,#,%,&)',
  );

const schema = yup.object().shape({
  old_password: password_roules,
  new_password: password_roules,
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: {errors},
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  const handleCancel = () => {
    if (isLoading === false) setOpenModal(false);
  };
  useEffect(() => {
    if (openModal) reset({});
  }, [openModal]);

  const onFinish = data => {
    setIsLoading(true);
    changePassword(data)
      .then(res => {
        setIsLoading(false);

        setOpenModal(false);
      })
      .catch(err => {
        setIsLoading(false);
      });
  };

  const footer = [
    <Button
      disabled={isLoading}
      className="login-form-button"
      key="cancel"
      onClick={handleCancel}>
      Cancel
    </Button>,

    <Button
      loading={isLoading}
      type="primary"
      key="ok"
      form="change-password-form"
      icon={<SaveOutlined />}
      htmlType="submit"
      className="login-form-button">
      Edit
    </Button>,
  ];

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Edit password</Button>
      <Modal
        title="Change password"
        visible={openModal}
        onCancel={handleCancel}
        footer={footer}>
        <Form
          id="change-password-form"
          labelCol={{span: 7}}
          wrapperCol={{span: 17}}
          layout="horizontal"
          onFinish={handleSubmit(onFinish)}>
          <FormInput
            data={{
              type: 'password',
              name: 'old_password',
              label: 'Old password',
              required: true,
              input_params: {
                placeholder: ' type old password',
              },
            }}
            errors={errors}
            control={control}
          />
          <FormInput
            data={{
              type: 'text',
              name: 'new_password',
              label: 'New password',
              required: true,
              input_params: {
                type: 'password',
                placeholder: 'type new password',
              },
            }}
            errors={errors}
            control={control}
          />
          <FormInput
            data={{
              type: 'text',
              name: 'confirm_password',
              label: 'Confirm password',
              required: true,
              input_params: {
                type: 'password',
                placeholder: 'Confirm new password',
              },
            }}
            errors={errors}
            control={control}
          />
        </Form>
      </Modal>
    </>
  );
};

export default ChangePassword;
