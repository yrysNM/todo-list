import React, { useEffect } from "react";

import { CustomButton } from "../CustomButton";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { CustomSortBlock } from "../Sorting";
import {
  toggleAscDesc,
  changeMethodSort,
  closeSort,
} from "../../redux/tool/ViewSlice";
import { LayoutSortMethod } from "../SortMethod";

import { ReactComponent as SortArrowAscIcon } from "../../assets/icons/sortArrowAsc.svg";
import { ReactComponent as SortArrowDescIcon } from "../../assets/icons/sortArrowDesc.svg";

const AscDescSort = () => {
  const { isAscDesc, methodSort } = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const closeSortFucn = () => dispatch(toggleAscDesc(false));

    window.addEventListener("click", closeSortFucn);

    return () => {
      window.removeEventListener("click", closeSortFucn);
    };
  });

  return (
    <>
      {methodSort.method !== "default" ? (
        <CustomButton
          clazz="btn-viewSort"
          type="button"
          onPressButton={(e) => {
            e.stopPropagation();
            dispatch(closeSort(false));
            dispatch(toggleAscDesc(!isAscDesc));
          }}
        >
          <CustomSortBlock
            text="Ordering"
            icon={
              methodSort.typeSort === "asc" ? (
                <SortArrowAscIcon />
              ) : (
                <SortArrowDescIcon />
              )
            }
            sortMenuText={
              methodSort.typeSort === "asc"
                ? "Ascending (default)".slice(0, 15) + "..."
                : "Descending"
            }
          />
        </CustomButton>
      ) : null}
      {isAscDesc && (
        <div
          className="sortmethods"
          style={{ gridTemplateRows: "repeat(2, 25px)" }}
        >
          <LayoutSortMethod
            isSort={methodSort.typeSort === "asc"}
            text="Ascending (default)"
            onClickSort={() => {
              dispatch(
                changeMethodSort({
                  method: methodSort.method,
                  activite: methodSort.activite,
                  typeSort: "asc",
                })
              );
            }}
          />
          <LayoutSortMethod
            isSort={methodSort.typeSort === "desc"}
            text="Descending"
            onClickSort={() => {
              dispatch(
                changeMethodSort({
                  method: methodSort.method,
                  activite: methodSort.activite,
                  typeSort: "desc",
                })
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export { AscDescSort };
