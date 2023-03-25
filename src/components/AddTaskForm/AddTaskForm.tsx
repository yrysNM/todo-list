import React, { useState } from "react";

import { CustomButton } from "../CustomButton";

import "./addTaskForm.scss";

export const AddTaskForm: React.FC<{
  setIsAddTask: (value: boolean) => void;
}> = ({ setIsAddTask }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [descript, setDescript] = useState<string>("");
  const [isBlur, setIsBlur] = useState(false);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("added");
  };

  return (
    <div className="addTaskForm">
      <form
        className={`form form-add ${isBlur ? "blur" : ""}`}
        onSubmit={handleClick}
      >
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
            onPressButton={handleClick}
          >
            <span className="title title-addTask">Add task</span>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
