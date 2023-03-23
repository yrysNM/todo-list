import React, { useEffect } from "react";

import { timeout } from "../App/App";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { setCompletedItems } from "../../redux/tool/ItemsSlice";
import { IArchiveCompleted } from "../../Interfaces";
import { ItemBtns } from "../ItemBtns";
import { ItemInfo } from "../ItemInfo";
import { ListItemsLayout } from "../layouts/ListItemsLayout";

const CompletedItems = () => {
  const { completedItems, items } = useAppSelector((state) => state.items);
  const { valBtn } = useAppSelector((state) => state.isCompletedBtn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    timeout(1000);
    fetch(
      `${process.env.REACT_APP_BASE_URL_SYNC}/archive/items?project_id=${process.env.REACT_APP_PROJECT_ID}&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY,
        },
      }
    )
      .then((r) => r.json())
      .then((res: IArchiveCompleted) => dispatch(setCompletedItems(res)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valBtn]);

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
            <ItemBtns />
          </ListItemsLayout>
        ))}
    </div>
  );
};

export { CompletedItems };
