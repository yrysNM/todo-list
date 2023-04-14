import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

interface InitialTypeUser {
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
  userLoading: "idle" | "loading" | "error";
}

const initialState: IUser = {
  user: {
    full_name: "",
    id: "",
    email: "",
    image_id: null,
    joined_at: "",
    premium_status: "",
    inbox_project_id: "",
  },
  userLoading: "idle",
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

type valueUserType = {
  email: string;
  password: string;
};

export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (valueUser: valueUserType) => {
    const { request } = useHttp();
    return await request<typeUser>({
      url: `https://todoist.com/API/v9.0/user/login`,
      method: "POST",
      body: JSON.stringify({
        ...valueUser,
      }),
    });
  }
);

export const fetchInitialUser = createAsyncThunk(
  "user/fetchInitialUser",
  async () => {
    const { request } = useHttp();

    return await request<InitialTypeUser>({
      url: `https://todoist.com/API/v9.0/sync`,
      method: "POST",
      body: JSON.stringify({
        limit_notes: 1,
        max_notes: 5,
        resource_types: ["user"],
        sync_token: "*",
        with_dateist_version: 1,
        with_web_static_version: true,
      }),
    });
  }
);

export const fetchRegisterUser = createAsyncThunk(
  "user/fetchRegisterUser",
  async (valueUser: valueUserType) => {
    const { request } = useHttp();
    return await request<typeUser>({
      url: `${process.env.REACT_APP_BASE_URL_SYNC}/user/register`,
      method: "POST",
      body: JSON.stringify({
        ...valueUser,
      }),
    });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<typeUser>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.userLoading = "loading";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = "idle";

        localStorage.setItem("project_id", action.payload.inbox_project_id);
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.userLoading = "error";
      })
      .addCase(fetchInitialUser.pending, (state) => {
        state.userLoading = "loading";
      })
      .addCase(fetchInitialUser.fulfilled, (state, action) => {
        state.userLoading = "idle";
        state.user = action.payload.user;

        localStorage.setItem(
          "project_id",
          action.payload.user.inbox_project_id
        );
      })
      .addCase(fetchInitialUser.rejected, (state) => {
        state.userLoading = "error";
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.userLoading = "loading";
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoading = "idle";

        localStorage.setItem("project_id", action.payload.inbox_project_id);
      })
      .addCase(fetchRegisterUser.rejected, (state) => {
        state.userLoading = "error";
      });
  },
});

const { reducer } = userSlice;

export default reducer;
