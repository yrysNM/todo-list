import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

interface IUser {
  full_name: string;
  id: string;
  userLoading: "idle" | "loading" | "error";
}

const initialState: IUser = {
  full_name: "",
  id: "",
  userLoading: "idle",
};

export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (valueUser: { email: string; password: string }) => {
    const { request } = useHttp();
    return await request<IUser>({
      url: `https://todoist.com/API/v9.0/user/login`,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.userLoading = "loading";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.full_name = action.payload.full_name;
        state.id = action.payload.id;
        state.userLoading = "idle";
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.userLoading = "error";
      });
  },
});

const { reducer } = userSlice;

export default reducer;
