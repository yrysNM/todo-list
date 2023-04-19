import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

interface InitialTypeUser {
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
  userLoading: "idle" | "loading" | "error";
}

const initialState: IUser = {
  sync_token: "",
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
      url: `${import.meta.env.VITE_APP_BASE_URL_SYNC}/user/register`,
      method: "POST",
      body: JSON.stringify({
        ...valueUser,
      }),
    });
  }
);

export const fetchUpdateUser = createAsyncThunk(
  "user/fetchUpdateUser",
  async (userData: Partial<typeUser>) => {
    const { request } = useHttp();
    return await request<{ sync_stataus: Object }>({
      url: `${import.meta.env.VITE_APP_BASE_URL_SYNC}/sync`,
      method: "POST",
      body: JSON.stringify({
        type: "user_update",
        args: userData,
        uuid: "effefe72-4e3e-4f9a-0b85-ad66abfc283d",
        // sync_token: JSON.parse(localStorage.getItem("sync_token")),
        current_password: "admin12@",
      }),
    });
  }
);

const userSlice = createSlice({
  name: "user",
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

        // localStorage.setItem(
        //   "sync_token",
        //   JSON.stringify(action.payload.sync_token)
        // );
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

const { actions, reducer } = userSlice;

export default reducer;

export const { updateUserValue, userAvatarImage } = actions;
