import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { fetchCompletedItems } from "../../redux/tool/ItemsSlice";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";
import { ListItemsLayout } from "../layouts/ListItemsLayout";

const CompletedItems = () => {
  const { completedItems } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompletedItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {completedItems &&
        completedItems.items.map((d) => (
          <ListItemsLayout key={d.id}>
            <ItemInfo
              content={d.content}
              description={d.description}
              is_completed={true}
              id={d.id}
            />
            <ItemBtns task_id={d.id} content={d.content} />
          </ListItemsLayout>
        ))}
    </div>
  );
};

export { CompletedItems };
