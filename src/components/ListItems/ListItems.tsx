import React, { useEffect } from "react";

import { setSearchItems } from "../../redux/tool/ItemsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { ListItemsLayout } from "../layouts/ListItemsLayout";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";

import "./listItems.scss";
import { IArchiveItem } from "../../Interfaces";

export const ListItems = () => {
  const { items, searchItems } = useAppSelector((state) => state.items);
  const { methodSort } = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (methodSort.method === "name") {
      if (methodSort.typeSort === "asc") {
        const sortName = [...items].sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? 1 : -1
        );

        dispatch(setSearchItems(sortName));
      } else if (methodSort.typeSort === "desc") {
        const sortName = [...items].sort((a, b) =>
          a.content.toLocaleLowerCase() > b.content.toLocaleLowerCase() ? -1 : 1
        );

        dispatch(setSearchItems(sortName));
      }
    } else if (methodSort.method === "date") {
      if (methodSort.typeSort === "asc") {
        const sortName = [...items].sort(
          (a, b) => +new Date(a.created_at) - +new Date(b.created_at)
        );

        dispatch(setSearchItems(sortName));
      } else if (methodSort.typeSort === "desc") {
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
      <>
        {itemList.map((item) => (
          <ListItemsLayout key={item.id}>
            <ItemInfo
              content={item.content}
              description={item.description}
              is_completed={item.is_completed}
              id={item.id}
            />
            <ItemBtns task_id={item.id} content={item.content} />
          </ListItemsLayout>
        ))}
      </>
    );
  };

  return (
    <div>
      {searchItems?.length > 0 ? ShowItems(searchItems) : ShowItems(items)}
    </div>
  );
};
