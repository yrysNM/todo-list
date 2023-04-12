import React, { useState } from "react";
import classNames from "classnames";

import { setSearchItems, searchValueAction } from "../../redux/tool/ItemsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";
import { Sorting } from "../Sorting";

import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import "./view.scss";

interface IView {
  onPressBtn: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const View = ({ onPressBtn }: IView) => {
  const [onBlurFocus, setOnBlurFocus] = useState<boolean>(false);
  // const [searchVal, setSearchVal] = useState<string>("");
  const dispatch = useAppDispatch();
  const { items, searchValue } = useAppSelector((state) => state.items);

  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const searchItem = items.filter(
      (item) => item.content.indexOf(value) !== -1
    );
    dispatch(searchValueAction(value));
    dispatch(setSearchItems(searchItem));
  }

  return (
    <div
      className="view"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => onPressBtn(e)}
    >
      <ViewBlockLayout title="View">
        <div className={classNames("subLayout")}>
          <SearchIcon className="searchIcon" />
          <input
            onBlur={() => setOnBlurFocus(false)}
            onFocus={() => setOnBlurFocus(true)}
            value={searchValue}
            onChange={searchChange}
            type="search"
            name="search"
            className={classNames("input searchInput", {
              "searchInput-active": onBlurFocus,
            })}
            placeholder="Search"
          />
        </div>
      </ViewBlockLayout>
      <ViewBlockLayout title="Sort">
        <Sorting />
      </ViewBlockLayout>
    </div>
  );
};

interface IViewLayout extends IGeneralChildren {
  title: string;
}

const ViewBlockLayout: React.FC<IViewLayout> = ({ title, children }) => {
  return (
    <>
      <div className="view-layout">
        <p className="title title-view">{title}</p>
        <InfoIcon className="icon infoModalIcon" />
      </div>
      {children}
    </>
  );
};
