import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  IArchiveCompleted,
  IArchiveItem,
  ITodoistMethod,
} from '../../Interfaces';
import {useHttp} from '../../hooks/http.hook';
import {getItem} from '../../utils/PresistanceStorage';

export const fetchCompletedItems = createAsyncThunk(
  'items/fetchCompletedItems',
  async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_APP_BASE_URL_SYNC
      }/archive/items?project_id=${getItem('project_id')}&limit=20`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + getItem<string>('token'),
        },
      }
    );

    return (await response.json()) as IArchiveCompleted;
  }
);

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const {request} = useHttp();
  return await request<IArchiveItem[]>({
    url: `${import.meta.env.VITE_APP_BASE_URL}/tasks`,
    method: 'GET',
  });
});

export const fetchItem = createAsyncThunk(
  'items/fetchItem',
  async (task_id: string) => {
    const {request} = useHttp();
    return await request<IArchiveItem>({
      url: `${import.meta.env.VITE_APP_BASE_URL}/tasks/${task_id}`,
      method: 'GET',
    });
  }
);

export const fetchAddItem = createAsyncThunk(
  'item/fetchAddItem',
  async ({content, description, due_lang}: ITodoistMethod) => {
    const {request} = useHttp();
    return await request<IArchiveItem>({
      url: `${import.meta.env.VITE_APP_BASE_URL}/tasks/`,
      method: 'POST',
      body: JSON.stringify({
        content,
        description,
        due_lang,
      }),
    });
  }
);

export const fetchUpdateItem = createAsyncThunk(
  'item/fetchUpdateItem',
  async ({task_id, content, description}: ITodoistMethod) => {
    const {request} = useHttp();
    return await request<IArchiveItem>({
      url: `${import.meta.env.VITE_APP_BASE_URL}/tasks/${task_id}`,
      method: 'POST',
      body: JSON.stringify({content, description}),
    });
  }
);

/**
 * items change
 * @TODO feature
 */
export const fetchReorderItems = createAsyncThunk(
  'items/fetchReorderItems',
  async (data: {id: string; child_order: number}[]) => {
    const {request} = useHttp();
    return await request<IArchiveItem>({
      url: `${import.meta.env.VITE_APP_BASE_URL_SYNC}/sync`,
      method: 'POST',
      body: JSON.stringify({
        commands: [
          {
            type: 'item_reorder',
            uuid: '9247faf3-d83a-9d8c-2773-b5054e3ee20b',
            args: {
              items: data,
            },
          },
        ],
      }),
    });
  }
);
