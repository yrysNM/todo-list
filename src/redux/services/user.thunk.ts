import {createAsyncThunk} from '@reduxjs/toolkit';
import {useHttp} from '../../hooks/http.hook';
import {InitialTypeUser, typeUser} from '../tool/UserSlice';

type valueUserType = {
  email: string;
  password: string;
};

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async (valueUser: valueUserType) => {
    const {request} = useHttp();
    return await request<typeUser>({
      url: `https://todoist.com/API/v9.0/user/login`,
      method: 'POST',
      body: JSON.stringify({
        ...valueUser,
      }),
    });
  }
);

export const fetchInitialUser = createAsyncThunk(
  'user/fetchInitialUser',
  async () => {
    const {request} = useHttp();

    return await request<InitialTypeUser>({
      url: `https://todoist.com/API/v9.0/sync`,
      method: 'POST',
      body: JSON.stringify({
        limit_notes: 1,
        max_notes: 5,
        resource_types: ['user'],
        sync_token: '*',
        with_dateist_version: 1,
        with_web_static_version: true,
      }),
    });
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async (valueUser: valueUserType) => {
    const {request} = useHttp();
    return await request<typeUser>({
      url: `${import.meta.env.VITE_APP_BASE_URL_SYNC}/user/register`,
      method: 'POST',
      body: JSON.stringify({
        ...valueUser,
      }),
    });
  }
);

export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async (userData: Partial<typeUser>) => {
    const {request} = useHttp();
    return await request<{sync_stataus: Object}>({
      url: `${import.meta.env.VITE_APP_BASE_URL_SYNC}/sync`,
      method: 'POST',
      body: JSON.stringify({
        type: 'user_update',
        args: userData,
        uuid: 'effefe72-4e3e-4f9a-0b85-ad66abfc283d',
        // sync_token: JSON.parse(localStorage.getItem("sync_token")),
        current_password: 'admin12@',
      }),
    });
  }
);
