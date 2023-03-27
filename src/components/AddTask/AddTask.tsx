import React, { useState } from "react";
import classnames from "classnames";

import { AddTaskForm } from "../AddTaskForm";

import "./addTask.scss";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

export const AddTask = () => {
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  return (
    <div
      className={classnames("addTask", {
        "addTask-active": isAddTask,
      })}
    >
      {!isAddTask && (
        <div className="addTask-wrapper" onClick={() => setIsAddTask(true)}>
          <span className="icon" style={{ marginRight: 11 }}>
            <PlusIcon />
          </span>
          <span className="sub-title" style={{ fontSize: 14 }}>
            Add task
          </span>
        </div>
      )}
      {isAddTask && (
        <AddTaskForm setIsAddTask={setIsAddTask} isUpdateItem={false} />
      )}
    </div>
  );
};
