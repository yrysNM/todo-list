import React from "react";

import { AddTask } from "../../components/AddTask";
import { CompletedItems } from "../../components/CompletedItems";
import { ListItems } from "../../components/ListItems";
import { Today } from "../../components/Today";
import { PageLayout } from "../../components/layouts/PageLayout";

const Main = () => {
  return (
    <PageLayout>
      <Today />
      <ListItems />
      <AddTask />
      <CompletedItems />
    </PageLayout>
  );
};

export { Main };
