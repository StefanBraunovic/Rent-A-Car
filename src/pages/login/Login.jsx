import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from '../login/Login.module.css';
import Car from '../../images/car-animation/car.png';
import wheel from '../../images/car-animation/wheel.png';
import logo from '../../images/logo.png';
import {useHistory} from 'react-router-dom';
import {Login, me} from '../../services/account';
import {saveAuth} from '../../functions/helper';
import {ROLES} from '../../constants/constants';
import {Button} from 'antd';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('required')
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .max(12, 'Password is too long - should be 12 chars maximum.')
    .matches(
      /^[a-zA-Z0-9!#%&]*$/g,
      'Password can only contain Latin letters, numbers and chars(!,#,%,&)',
    ),
});

const LoginPage = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});

  const [isLoading, setLoading] = useState(false);

  const onSubmit = data => {
    Login(data)
      .then(function (response) {
        localStorage.setItem('jwt-token', response?.data['access_token']);
        let token = response?.data?.access_token;
        setLoading(true);

        me(token).then(res => {
          saveAuth({
            name: res?.data?.name,
            role: res?.data?.role_id === 1 ? ROLES.EMPLOYEE : ROLES.CLIENT,
            token: token,
          });
          localStorage.setItem('role_id', res?.data.role_id);
          history.push('/home');
          setLoading(false);
        });
      })
      .catch(function (error) {
        if (error?.response?.data?.error === 'Unauthorized') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Wrong credentials!',
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.hero}>
        <div className={style.loginBody}>
          <div className={style.login}>
            <div className={style.logo}>
              <img src={logo} alt="car" />
            </div>
            <div className={style.title}>Sign In to Rent Smart</div>
            <div className={style.subtitle}>Made easy!</div>
            <div className={style.fields}>
              <div className={style.email}>
                <svg className="svg-icon" viewBox="0 0 20 20">
                  <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                </svg>
                <input
                  type="email"
                  placeholder="email"
                  {...register('email')}
                />
              </div>
              <p style={{textAlign: 'center', color: 'red'}}>
                {errors.email?.message}
              </p>
              <div className={style.password}>
                <svg className="svg-icon" viewBox="0 0 20 20">
                  <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  {...register('password')}
                />
              </div>
              <div>
                <p style={{textAlign: 'center', color: 'red'}}>
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <Button
              type="submit"
              loading={isLoading}
              className={style.signinBtn}
              htmlType="submit">
              Submit
            </Button>
            <span style={{color: 'red'}}>{errorMessage}</span>
          </div>
        </div>

        <div className={style.highway}></div>
        <div className={style.city}></div>
        <div className={style.car}>
          <img src={Car} alt="car" />
        </div>
        <div className={style.wheel}>
          <img src={wheel} alt="" className={style.backWheel} />
          <img src={wheel} alt="" className={style.frontWheel} />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
