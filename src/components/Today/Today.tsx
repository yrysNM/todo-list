import React, { useState, useEffect } from "react";

import { CustomButton } from "../CustomButton";
import { View } from "../view/View";

import "./today.scss";

import { ReactComponent as ViewIcon } from "../../assets/icons/view.svg";

export const Today = () => {
  const [date] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const handleHide = () => setIsOpen(false);

    window.addEventListener("click", handleHide);

    return () => {
      window.removeEventListener("click", handleHide);
    };
  });

  return (
    <>
      <section className="today">
        <div className="today-wrapper">
          <div className="today-subheadText">
            <h5 className="title title-500">Today</h5>
            <span className="sub-title">{`${
              days[date.getDay()]
            } ${date.getDate()} ${date.toLocaleDateString("en-US", {
              month: "short",
            })}`}</span>
          </div>
          <CustomButton
            clazz="btn-headToday"
            type="button"
            onPressButton={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            <div className="today-view">
              <span className="icon icon-disactive">
                <ViewIcon />
              </span>

              <p className="sub-title" style={{ color: "inherit" }}>
                View
              </p>
            </div>
          </CustomButton>
        </div>
      </section>
      {isOpen && <View />}
    </>
  );
};
