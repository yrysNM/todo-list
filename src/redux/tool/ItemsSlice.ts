import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  ITodoistData,
  IArchiveCompleted,
  IArchiveItem,
} from "../../Interfaces";

interface IItems {
  items: ITodoistData[];
  completedItems: IArchiveCompleted;
}

const initialState: IItems = {
  items: [],
  completedItems: {
    completed_info: [],
    has_more: false,
    items: [],
    total: 0,
  },
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ITodoistData[]>) => {
      state.items = action.payload;
    },
    updateItems: (
      state,
      action: PayloadAction<{ id: string; is_completed: boolean }>
    ) => {
      const updateItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.is_completed = action.payload.is_completed;

          return { ...item };
        }

        return item;
      });

      state.items = updateItems;
    },
    setCompletedItems: (state, action: PayloadAction<IArchiveCompleted>) => {
      state.completedItems = action.payload;
    },
    updateCompletedItems: (state, action: PayloadAction<IArchiveItem[]>) => {
      state.completedItems.items = action.payload;
    },
  },
});

const { actions, reducer } = itemsSlice;

export default reducer;

export const selectItems = (state: RootState) => state.items.items;

export const {
  setItems,
  updateItems,
  setCompletedItems,
  updateCompletedItems,
} = actions;
