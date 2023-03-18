import React, { useState } from "react";

import { AddTaskForm } from "../AddTaskForm";

import "./addTask.scss";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

export const AddTask = () => {
  const [isAddTask, setIsAddTask] = useState<boolean>(false);

  return (
    <div className="addTask">
      {!isAddTask && (
        <div className="addTask-wrapper" onClick={() => setIsAddTask(true)}>
          <span className="icon" style={{ marginRight: 11 }}>
            <PlusIcon />
          </span>
          <span className="sub-title">Add task</span>
        </div>
      )}
      {isAddTask && <AddTaskForm setIsAddTask={setIsAddTask} />}
    </div>
  );
};
