import React from "react";

import { CustomButton } from "../CustomButton";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";
import { CustomSortBlock } from "../Sorting";
import { toggleAscDesc } from "../../redux/tool/ViewSlice";

import { ReactComponent as SortArrowAscIcon } from "../../assets/icons/sortArrowAsc.svg";

const AscDescSort = () => {
  const { isAscDesc, methodSort } = useAppSelector((state) => state.view);
  const dispatch = useAppDispatch();

  return (
    <>
      {methodSort.method !== "default" ? (
        <CustomButton
          clazz="btn-viewSort"
          type="button"
          onPressButton={(e) => {
            e.stopPropagation();
            dispatch(toggleAscDesc(!isAscDesc));
          }}
        >
          <CustomSortBlock
            text="Ordering"
            icon={<SortArrowAscIcon />}
            sortMenuText={"Ascending (default)".slice(0, 15) + "..."}
          />
        </CustomButton>
      ) : null}
    </>
  );
};

export { AscDescSort };
