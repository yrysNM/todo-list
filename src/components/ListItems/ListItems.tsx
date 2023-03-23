import React, { useEffect } from "react";

import { setItems } from "../../redux/tool/ItemsSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { ListItemsLayout } from "../layouts/ListItemsLayout";
import { ITodoistData } from "../../Interfaces";
import { useHttp } from "../../hooks/http.hook";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";

import "./listItems.scss";

export const ListItems = () => {
  const { items } = useAppSelector((state) => state.items);
  const { valBtn } = useAppSelector((state) => state.isCompletedBtn);
  const dispatch = useAppDispatch();
  const { request } = useHttp();

  useEffect(() => {
    request<ITodoistData[]>({
      url: `${process.env.REACT_APP_BASE_URL}/tasks`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        "Content-Type": "application/json",
      },
    }).then((r) => dispatch(setItems(r)));

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
