import React from "react";

import { IGeneralChildren } from "../../Interfaces/IGeneralComponent";

import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";

export const View = () => {
  return (
    <ViewBlockLayout title="View">
      <div className="layout"></div>
    </ViewBlockLayout>
  );
};

interface IViewLayout extends IGeneralChildren {
  title: string;
}

const ViewBlockLayout: React.FC<IViewLayout> = ({ title, children }) => {
  return (
    <div className="view">
      <div className="view-layout">
        <p className="title title-600">{title}</p>
        <InfoIcon className="icon infoModalIcon" />
      </div>
      {children}
    </div>
  );
};
