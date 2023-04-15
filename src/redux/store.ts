import { configureStore } from "@reduxjs/toolkit";
import items from "./tool/ItemsSlice";
import isCompletedBtn from "./tool/isCompletedBtnSlice";
import view from "./tool/ViewSlice";
import user from "./tool/UserSlice";

const store = configureStore({
  reducer: { items, isCompletedBtn, view, user },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
