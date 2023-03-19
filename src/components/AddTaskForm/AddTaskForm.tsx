import React, { useState, useEffect } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

import { CustomButton } from "../CustomButton";

import "./addTaskForm.scss";

export const AddTaskForm = ({
  setIsAddTask,
}: {
  setIsAddTask: (value: boolean) => void;
}) => {
  const [taskName, setTaskName] = useState<string>("");
  const [descript, setDescript] = useState<string>("");
  const [isBlur, setIsBlur] = useState(false);

  return (
    <div className="addTaskForm">
      <form className={`form form-add ${isBlur ? "blur" : ""}`}>
        <div className="form-block">
          <input
            type="text"
            name="task_name"
            className="input inputName"
            value={taskName}
            onFocus={() => setIsBlur(true)}
            onBlur={() => setIsBlur(false)}
            placeholder="Task name"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            name="description_task"
            className="input inputDescr"
            value={descript}
            onFocus={() => setIsBlur(true)}
            onBlur={() => setIsBlur(false)}
            placeholder="Description"
            onChange={(e) => setDescript(e.target.value)}
          />
        </div>

        <div className="form-btns">
          <CustomButton
            clazz="btn-cancel"
            type="button"
            onPressButton={() => setIsAddTask(false)}
          >
            <span className="title title-cancel">Cancel</span>
          </CustomButton>
          <CustomButton
            clazz="btn-addTask"
            type="submit"
            isPrevent={taskName.length > 0 ? false : true}
            onPressButton={() => console.log("submit")}
          >
            <span className="title title-addTask">Add task</span>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
