import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux.hook';
import {useToken} from '../../hooks/token.hook';
import {AuthLayout} from '../../components/layouts/AuthLayout';
import {AuthTemplate} from '../../components/AuthTemplate';

import TodoImg from '../../assets/img/todoImg2.png';
import {fetchRegisterUser} from '../../redux/tool/UserSlice';
import {ErrorMessage} from '../../components/ErrorMessage';
import {Spinner} from '../Sprinner';

type tLogin = {token: string};

const Register = () => {
  const {setToken} = useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const {userLoading} = useAppSelector((state) => state.user);

  const registerUser = (value: {
    email: string;
    password: string;
    full_name: string;
  }) => {
    dispatch(fetchRegisterUser(value))
      .then((res) => {
        const {token} = res.payload as tLogin;

        setToken(token);
        navigate('/', {replace: false});
      })
      .catch((err) => console.log(err));
  };

  const initialContent = () => {
    if (userLoading === 'loading') {
      return <Spinner />;
    } else if (userLoading === 'error') {
      return <ErrorMessage customErrorText="Something went wrong" />;
    } else if (pathname === '/register') {
      return (
        <AuthLayout image={TodoImg} isLogin={false}>
          <AuthTemplate isLogin={false} getValueInput={registerUser} />
        </AuthLayout>
      );
    }
  };

  const render = initialContent();

  return <>{render}</>;
};

export {Register};
