import { configureStore } from "@reduxjs/toolkit";
import items from "./tool/ItemsSlice";
import isCompletedBtn from "./tool/isCompletedBtnSlice";
import view from "./tool/ViewSlice";
import user from "./tool/UserSlice";
import { apiSlice } from "../api/apiSlice";

const store = configureStore({
  reducer: {
    items,
    isCompletedBtn,
    view,
    user,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: import.meta.env.DEV === true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
