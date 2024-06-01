import React, { useRef } from "react";

import { AddNewItemProps } from "../../interfaces/AddNewItemProps";

export const AddNewItem: React.FC<AddNewItemProps> = ({ items, setItems }) => {
  const inputRefAddNewItem = useRef<HTMLInputElement>(null);

  const handleClickFocusAddNewItem = () => {
    if (inputRefAddNewItem.current !== null) {
      inputRefAddNewItem.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      setItems([...items, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    } else {
      return null;
    }
  };

  return (
    <>
      <h1 className="h1-add-new-item">add new</h1>
      <div className="field" onClick={handleClickFocusAddNewItem}>
        <input
          type="text"
          placeholder="Add a new to-do..."
          ref={inputRefAddNewItem}
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};
