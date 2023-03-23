import React from "react";

import { ReactComponent as TrashIcon } from "../../assets/icons/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { CustomButton } from "../CustomButton";

export const ItemBtns = () => {
  return (
    <div className="item-methods">
      <CustomButton
        clazz="btn-icon"
        type="button"
        onPressButton={() => console.log("edit")}
      >
        <EditIcon />
      </CustomButton>
      <CustomButton
        clazz="btn-icon"
        type="button"
        onPressButton={() => console.log("trash")}
      >
        <TrashIcon className="iconRed" />
      </CustomButton>
    </div>
  );
};
