import React, { useState, useEffect, useRef } from "react";

import "../../styles/dashboard/App.scss";
import { TrashIcon } from "../Icons/TrashIcon";

export const ToDoList = () => {
  const [toggleClassState, SetToggleClassState] = useState(false);
  const [items, setItems] = useState(["Swimming pool"]);

  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleClickToggleClass = () => {
    SetToggleClassState((toggleClassState) => !toggleClassState);
  };

  const handleClickFocus1 = () => {
    if (inputRef1.current !== null) {
      inputRef1.current.focus();
    }
  };

  const handleClickFocus2 = () => {
    if (inputRef2.current !== null) {
      inputRef2.current.focus();
    }
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter"
      ? setItems(items.concat(e.currentTarget.value))
      : setItems(items);
  };

  const ItemToggleClassState = toggleClassState ? "-completed" : "";

  return (
    <div className="to-do-list-wrapper">
      <h1>Search</h1>
      <div className="field" onClick={handleClickFocus1}>
        <form>
          <input
            type="text"
            placeholder="Enter your search item.."
            ref={inputRef1}
          />
        </form>
      </div>

      {items.map((items: string, index: number): any => {
        // const clickedIndex = index;
        return (
          <React.Fragment key={index}>
            <div className="to-do-item-wrapper">
              <div
                className={`to-do-item${ItemToggleClassState}`}
                onClick={handleClickToggleClass}
              >
                <div className="to-do-item-flex">
                  <h2>{items}</h2>
                  <TrashIcon />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <h1 className="h1-add-new-item">add new</h1>
      <div className="field" onClick={handleClickFocus2}>
        <form onSubmit={onFormSubmit}>
          <input
            type="text"
            placeholder="Add a new to-do..."
            ref={inputRef2}
            onKeyDown={handleKeyDown}
          />
        </form>
      </div>
    </div>
  );
};
