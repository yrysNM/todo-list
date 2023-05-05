import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  fetchUserLogin,
  fetchInitialUser,
  fetchRegisterUser,
  fetchUpdateUser,
} from '../services/user.thunk';

import {setItem} from '../../utils/PresistanceStorage';

export interface InitialTypeUser {
  sync_token: string;
  avatar?: File;
  user: {
    email: string;
    full_name: string;
    id: string;
    image_id: string | null;
    joined_at: string;
    premium_status: string;
    inbox_project_id: string;
  };
}

interface IUser extends InitialTypeUser {
  userLoading: 'idle' | 'loading' | 'error';
  errorText: string;
}

const initialState: IUser = {
  sync_token: '',
  user: {
    full_name: '',
    id: '',
    email: '',
    image_id: null,
    joined_at: '',
    premium_status: '',
    inbox_project_id: '',
  },
  userLoading: 'idle',
  errorText: '',
};

export type typeUser = {
  email: string;
  full_name: string;
  id: string;
  image_id: string | null;
  joined_at: string;
  premium_status: string;
  inbox_project_id: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserValue: (state, action: PayloadAction<Partial<typeUser>>) => {
      // state.user[keyof typeof action.payload] = action.payload;
      const objK = Object.keys(action.payload);
      state.user[objK[0] as keyof typeof state.user] =
        action.payload[objK[0] as keyof typeof state.user];
    },
    userAvatarImage: (state, action: PayloadAction<File>) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.userLoading = 'loading';
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = 'idle';

        setItem('project_id', action.payload.inbox_project_id);
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.userLoading = 'error';
        state.errorText = action.error.message;
      })
      .addCase(fetchInitialUser.pending, (state) => {
        state.userLoading = 'loading';
      })
      .addCase(fetchInitialUser.fulfilled, (state, action) => {
        state.userLoading = 'idle';
        state.user = action.payload.user;

        setItem('project_id', action.payload.user.inbox_project_id);
      })
      .addCase(fetchInitialUser.rejected, (state, action) => {
        state.userLoading = 'error';
        state.errorText = action.error.message;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.userLoading = 'loading';
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = 'idle';

        setItem('project_id', action.payload.inbox_project_id);
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.userLoading = 'error';
        state.errorText = action.error.message;
      });
  },
});

const {actions, reducer} = userSlice;

export default reducer;

export const {updateUserValue, userAvatarImage} = actions;

export {fetchUserLogin, fetchInitialUser, fetchRegisterUser, fetchUpdateUser};
