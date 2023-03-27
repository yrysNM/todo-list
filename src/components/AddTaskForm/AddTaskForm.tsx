import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.hook";

import { fetchAddItem, fetchUpdateItem } from "../../redux/tool/ItemsSlice";
import { CustomButton } from "../CustomButton";

import "./addTaskForm.scss";

export const AddTaskForm: React.FC<{
  setIsAddTask: (value: boolean) => void;
  isUpdateItem: boolean;
  task_id?: string;
}> = ({ setIsAddTask, isUpdateItem, task_id }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [descript, setDescript] = useState<string>("");
  const [isBlur, setIsBlur] = useState(false);
  const { editItem } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  const handleClickAdd = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    dispatch(
      fetchAddItem({
        content: taskName,
        description: descript,
        due_lang: "en",
      })
    );

    setTaskName("");
    setDescript("");
  };

  const handleClickUpdate = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    dispatch(
      fetchUpdateItem({
        task_id,
        content: taskName,
        description: descript,
      })
    );

    setIsAddTask(false);
  };

  useEffect(() => {
    if (editItem) {
      setTaskName(editItem.content);
      setDescript(editItem.description);
    }
  }, [editItem]);

  return (
    <div className="addTaskForm">
      <form
        className={`form form-add ${isBlur ? "blur" : ""}`}
        onSubmit={isUpdateItem ? handleClickUpdate : handleClickAdd}
      >
        <div className="form-block">
          <input
            type="text"
            name="task_name"
            className="input inputName"
            value={taskName || ""}
            onFocus={() => setIsBlur(true)}
            onBlur={() => setIsBlur(false)}
            placeholder="Task name"
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            name="description_task"
            className="input inputDescr"
            value={descript || ""}
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
            isPrevent={taskName?.length > 0 ? false : true}
            onPressButton={(e) =>
              isUpdateItem ? handleClickUpdate(e) : handleClickAdd(e)
            }
          >
            <span className="title title-addTask">
              {isUpdateItem ? "Save" : "Add task"}
            </span>
          </CustomButton>
        </div>
      </form>
    </div>
  );
};
