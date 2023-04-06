import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IView {
  isAscDesc: boolean;
  isSort: boolean;
  methodSort: {
    method: string;
    activite: boolean;
  };
}

const initialState: IView = {
  isAscDesc: false,
  isSort: false,
  methodSort: {
    method: "default",
    activite: true,
  },
};

const ViewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    closeSort: (state, action: PayloadAction<false>) => {
      state.isSort = action.payload;
    },
    openSort: (state, action: PayloadAction<true>) => {
      state.isSort = action.payload;
    },
    changeMethodSort: (
      state,
      action: PayloadAction<{ method: string; activite: boolean }>
    ) => {
      state.methodSort = action.payload;
    },
    toggleAscDesc: (state, action: PayloadAction<boolean>) => {
      state.isAscDesc = action.payload;
    },
  },
});

const { actions, reducer } = ViewSlice;

export default reducer;

export const { closeSort, openSort, changeMethodSort, toggleAscDesc } = actions;
