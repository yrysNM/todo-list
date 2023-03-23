import React from "react";

import { Today } from "../Today";
import { AddTask } from "../AddTask";
import { PageLayout } from "../layouts/PageLayout";
import { ListItems } from "../ListItems";
import { CompletedItems } from "../CompletedItems";

import "./app.scss";

export const App = (): JSX.Element => {
  return (
    <div className="container">
      <PageLayout>
        <Today />
        <ListItems />
        <AddTask />
        <CompletedItems />
      </PageLayout>
    </div>
  );
};
