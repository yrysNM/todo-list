import React, {useEffect} from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

import {
  setItems,
  setSearchItems,
  // fetchReorderItems,
} from '../../redux/tool/ItemsSlice';
import {useAppSelector, useAppDispatch} from '../../hooks/redux.hook';
import {ListItemsLayout} from '../layouts/ListItemsLayout';
import {ItemBtns} from '../ItemBtns';
import {ItemInfo} from '../ItemInfo';

import './listItems.scss';
import {IArchiveItem} from '../../Interfaces';

export const ListItems = () => {
  const {items, searchItems} = useAppSelector((state) => state.items);
  const {methodSort} = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const itemsList = Array.from(items);
    const [reorderedItem] = itemsList.splice(result.source.index, 1);
    itemsList.splice(result.destination.index, 0, reorderedItem);

    //change items info
    // const reorderItem: { id: string; child_order: number }[] = [
    //   {
    //     id: reorderedItem.id,
    //     child_order: reorderedItem.order,
    //   },
    // ];

    // dispatch(fetchReorderItems(reorderItem));

    dispatch(setItems(itemsList));
  };

  useEffect(() => {
    if (methodSort.method === 'name') {
      if (methodSort.typeSort === 'asc') {
        const sortName = [...items].sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        dispatch(setSearchItems(sortName));
      } else if (methodSort.typeSort === 'desc') {
        const sortName = [...items].sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? -1 : 1
        );

        dispatch(setSearchItems(sortName));
      }
    } else if (methodSort.method === 'date') {
      if (methodSort.typeSort === 'asc') {
        const sortName = [...items].sort(
          (a, b) => +new Date(a.created_at) - +new Date(b.created_at)
        );

        dispatch(setSearchItems(sortName));
      } else if (methodSort.typeSort === 'desc') {
        const sortName = [...items].sort(
          (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
        );

        dispatch(setSearchItems(sortName));
      }
    } else {
      dispatch(setSearchItems([]));
    }
  }, [methodSort]);

  const ShowItems = (itemList: IArchiveItem[]) => {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {itemList.map((item, i) => (
                <Draggable key={item.id} draggableId={item.id} index={i}>
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ListItemsLayout>
                        <ItemInfo
                          content={item.content}
                          description={item.description}
                          is_completed={item.is_completed}
                          id={item.id}
                        />
                        <ItemBtns task_id={item.id} content={item.content} />
                      </ListItemsLayout>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div>
      {searchItems?.length > 0 ? ShowItems(searchItems) : ShowItems(items)}
    </div>
  );
};
