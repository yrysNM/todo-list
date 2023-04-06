import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type sortType = "asc" | "desc" | null;

interface IView {
  isAscDesc: boolean;
  isSort: boolean;
  methodSort: {
    method: string;
    activite: boolean;
    typeSort: sortType;
  };
}

const initialState: IView = {
  isAscDesc: false,
  isSort: false,
  methodSort: {
    method: "default",
    activite: true,
    typeSort: null,
  },
};

const ViewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    closeSort: (state, action: PayloadAction<false>) => {
      state.isSort = action.payload;
    },
    openSort: (state, action: PayloadAction<boolean>) => {
      state.isSort = action.payload;
    },
    changeMethodSort: (
      state,
      action: PayloadAction<{
        method: string;
        activite: boolean;
        typeSort: sortType;
      }>
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
