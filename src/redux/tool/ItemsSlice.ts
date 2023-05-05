import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchCompletedItems,
  fetchAddItem,
  fetchItem,
  fetchItems,
  fetchUpdateItem,
} from '../services/item.thunk';

import type {RootState} from '../store';
import {IArchiveCompleted, IArchiveItem} from '../../Interfaces';

interface IItems {
  searchValue: string;
  items: IArchiveItem[];
  completedItems: IArchiveCompleted;
  editItem: Partial<IArchiveItem | IArchiveItem>;
  searchItems: IArchiveItem[];
}

const initialState: IItems = {
  searchValue: '',
  items: [],
  searchItems: [],
  completedItems: {
    completed_info: [],
    has_more: false,
    items: [],
    total: 0,
  },
  editItem: {},
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<IArchiveItem[]>) => {
      state.items = action.payload;
    },
    setSearchItems: (state, action: PayloadAction<IArchiveItem[]>) => {
      state.searchItems = action.payload;
    },
    setItem: (state, action: PayloadAction<IArchiveItem | IArchiveItem>) => {
      // state.items.push(action.payload);
      state.editItem = action.payload;
    },
    searchValueAction: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    updateItems: (
      state,
      action: PayloadAction<{id: string; is_completed: boolean}>
    ) => {
      const updateItems = state.items.map((item) => {
        if (item.id === action.payload.id) {
          item.is_completed = action.payload.is_completed;

          return {...item};
        }

        return item;
      });

      state.items = updateItems;
    },
    updateCompletedItems: (state, action: PayloadAction<IArchiveItem[]>) => {
      state.completedItems.items = action.payload;
    },
    toggleComplteItems: (
      state,
      action: PayloadAction<{isItem: boolean; data: IArchiveItem}>
    ) => {
      if (action.payload.isItem) {
        state.items.push(action.payload.data);
      } else {
        state.completedItems.items.unshift(action.payload.data);
      }
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
      })
      .addCase(fetchAddItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(fetchUpdateItem.fulfilled, (state, action) => {
        if (state.items.some((item) => item.id === action.payload.id)) {
          const updateItems = state.items.map((item) => {
            if (item.id === action.payload.id) {
              item.content = action.payload.content;
              item.description = action.payload.description;
              return {...item};
            }
            return item;
          });
          state.items = updateItems;
        } else if (
          state.completedItems.items.some(
            (item) => item.id === action.payload.id
          )
        ) {
          const updateCompletedItems = state.completedItems.items.map(
            (item) => {
              if (item.id === action.payload.id) {
                item.content = action.payload.content;
                item.description = action.payload.description;
                return {...item};
              }
              return item;
            }
          );
          state.completedItems.items = updateCompletedItems;
        }
      });
  },
});

const {actions, reducer} = itemsSlice;

export default reducer;

export const selectItems = (state: RootState) => state.items.items;

export const {
  searchValueAction,
  setItems,
  setItem,
  updateItems,
  toggleComplteItems,
  setSearchItems,
  updateCompletedItems,
} = actions;

export {
  fetchCompletedItems,
  fetchAddItem,
  fetchItem,
  fetchItems,
  fetchUpdateItem,
};
