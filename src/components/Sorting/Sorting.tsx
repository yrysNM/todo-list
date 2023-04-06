import React, { ReactNode } from "react";

import { SortMethod } from "../SortMethod";
import { openSort } from "../../redux/tool/ViewSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";
import { CustomButton } from "../CustomButton";
import { AscDescSort } from "../AscDescSort";

import { ReactComponent as SortingIcon } from "../../assets/icons/sort.svg";
import { ReactComponent as ArrowDownIcon } from "../../assets/icons/arrowDown.svg";

import "./sorting.scss";

export const Sorting = () => {
  const { isSort, methodSort } = useAppSelector((state) => state.view);

  return (
    <>
      <LayoutSort
        text="Sorting"
        icon={<SortingIcon />}
        sortMenuText={methodSort.method}
      >
        <AscDescSort />
      </LayoutSort>
      {isSort && <SortMethod />}
    </>
  );
};

interface ILayoutSort extends IGeneralChildren {
  text: string;
  icon: ReactNode;
  sortMenuText: string;
}

/**
 *
 * @children -> Sort ASC OR DESC block
 * @text -> future feature for other methods text
 * @icon -> future feature for other methods
 * @sortMenuText -> type sort example default, name, date etc...
 * @returns -> JSX.Element
 */
const LayoutSort: React.FC<ILayoutSort> = ({
  children,
  text,
  icon,
  sortMenuText,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="viewSort">
      <CustomButton
        clazz="btn-viewSort"
        type="button"
        onPressButton={(e) => {
          e.stopPropagation();
          dispatch(openSort(true));
        }}
      >
        <CustomSortBlock {...{ text, icon, sortMenuText }} />
      </CustomButton>
      {children}
    </div>
  );
};

export const CustomSortBlock: React.FC<ILayoutSort> = ({
  text,
  icon,
  sortMenuText,
}) => {
  return (
    <div className="sortLayout">
      <div className="subLayoutSort">
        <span className="icon">{icon}</span>
        <span className="title-400 sortText">{text}</span>
      </div>
      <div className="subLayoutSort">
        <span className="sub-title">
          {sortMenuText.indexOf("date") !== -1
            ? "Due date"
            : sortMenuText[0].toUpperCase() +
              sortMenuText.slice(1, sortMenuText.length)}
        </span>
        <span className="icon">
          <ArrowDownIcon />
        </span>
      </div>
    </div>
  );
};
