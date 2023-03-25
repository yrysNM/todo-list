import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";
import type { RootState } from "../store";
import {
  ITodoistData,
  IArchiveCompleted,
  IArchiveItem,
} from "../../Interfaces";

interface IItems {
  items: ITodoistData[];
  completedItems: IArchiveCompleted;
  editItem: Partial<ITodoistData>;
}

const initialState: IItems = {
  items: [],
  completedItems: {
    completed_info: [],
    has_more: false,
    items: [],
    total: 0,
  },
  editItem: {},
};

export const fetchCompletedItems = createAsyncThunk(
  "items/fetchCompletedItems",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL_SYNC}/archive/items?project_id=${process.env.REACT_APP_PROJECT_ID}&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        },
      }
    );

    return (await response.json()) as IArchiveCompleted;
  }
);

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const { request } = useHttp();
  return await request<ITodoistData[]>({
    url: `${process.env.REACT_APP_BASE_URL}/tasks`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });
});

export const fetchItem = createAsyncThunk(
  "items/fetchItem",
  async (task_id: string) => {
    const { request } = useHttp();
    return await request<ITodoistData>({
      url: `${process.env.REACT_APP_BASE_URL}/tasks/${task_id}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    });
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedItems.fulfilled, (state, action) => {
        state.completedItems = action.payload;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.editItem = action.payload;
      });
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
