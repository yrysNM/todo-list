import React from "react";

import { useAppSelector } from "../../hooks/redux.hook";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";
import { ListItemsLayout } from "../layouts/ListItemsLayout";

const CompletedItems = () => {
  const { completedItems } = useAppSelector((state) => state.items);

  return (
    <div>
      {completedItems.items.map((d) => (
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
