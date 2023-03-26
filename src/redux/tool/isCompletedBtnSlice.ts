import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type btnComplete = {
  id: string;
  value: boolean;
};
interface ICompleteBtn {
  valBtn: btnComplete;
}

const initialState: ICompleteBtn = {
  valBtn: {
    id: "",
    value: false,
  },
};

const isCompletedBtnSlice = createSlice({
  name: "isCompletedBtn",
  initialState,
  reducers: {
    toggleCompleteBtn: (state, action: PayloadAction<btnComplete>) => {
      state.valBtn = action.payload;
    },
  },
});

const { actions, reducer } = isCompletedBtnSlice;

export default reducer;

export const { toggleCompleteBtn } = actions;
