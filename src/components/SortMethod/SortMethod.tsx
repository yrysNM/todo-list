import React, { useEffect } from "react";

import { changeMethodSort, closeSort } from "../../redux/tool/ViewSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { ReactComponent as TickIcon } from "../../assets/icons/completed.svg";

import "./sortMethod.scss";

export const SortMethod = () => {
  const dispatch = useAppDispatch();
  const { methodSort } = useAppSelector((state) => state.view);

  useEffect(() => {
    const closeSortFucn = () => dispatch(closeSort(false));

    window.addEventListener("click", closeSortFucn);

    return () => {
      window.removeEventListener("click", closeSortFucn);
    };
  });

  return (
    <div className="sortmethods">
      <LayoutSortMethod
        isSort={methodSort.method === "default"}
        text="Default"
        onClickSort={() =>
          dispatch(
            changeMethodSort({
              method: "default",
              activite: true,
              typeSort: null,
            })
          )
        }
      />
      <LayoutSortMethod
        isSort={methodSort.method === "name"}
        text="Name"
        onClickSort={() =>
          dispatch(
            changeMethodSort({
              method: "name",
              activite: true,
              typeSort: "asc",
            })
          )
        }
      />
      <LayoutSortMethod
        isSort={methodSort.method === "date"}
        text="Due date"
        onClickSort={() =>
          dispatch(
            changeMethodSort({
              method: "date",
              activite: true,
              typeSort: "asc",
            })
          )
        }
      />
    </div>
  );
};

interface ISortMethodLyout {
  text: string;
  onClickSort: () => void;
  isSort: boolean;
}

export const LayoutSortMethod: React.FC<ISortMethodLyout> = ({
  text,
  onClickSort,
  isSort,
}) => {
  return (
    <div className="methodBlock" onClick={() => onClickSort()}>
      <span className="title titleM">{text}</span>
      {isSort && (
        <span className="icon">
          <TickIcon />
        </span>
      )}
    </div>
  );
};
