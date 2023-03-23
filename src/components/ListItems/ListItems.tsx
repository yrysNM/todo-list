import React, { useEffect } from "react";

import { fetchItems } from "../../redux/tool/ItemsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { ListItemsLayout } from "../layouts/ListItemsLayout";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";

import "./listItems.scss";

export const ListItems = () => {
  const { items } = useAppSelector((state) => state.items);
  const { valBtn } = useAppSelector((state) => state.isCompletedBtn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valBtn]);

  return (
    <div>
      {items.map((item) => (
        <ListItemsLayout key={item.id}>
          <ItemInfo
            content={item.content}
            description={item.description}
            is_completed={item.is_completed}
            id={item.id}
          />
          <ItemBtns />
        </ListItemsLayout>
      ))}
    </div>
  );
};
