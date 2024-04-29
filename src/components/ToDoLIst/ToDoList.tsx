import React from "react";

import "../../styles/dashboard/App.scss";
import { TrashIcon } from "../Icons/TrashIcon";

export const ToDoList = () => {
  return (
    <div className="to-do-wrapper">
      <h1>Search</h1>
      <div className="field">
        <h2>Enter your search item...</h2>
      </div>

      <div className="to-do-item-wrapper">
        <div className="to-do-item">
          <div className="to-do-item-flex">
            <h2>lollololololololo</h2>
            <TrashIcon />
          </div>
        </div>
      </div>

      <h1 className="h1-add-new-item">add new</h1>
      <div className="field">
        <h2>Add a new to-do...</h2>
      </div>
    </div>
  );
};
