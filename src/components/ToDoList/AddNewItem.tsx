import React, { useRef } from "react";

interface handleKeyDownProps {
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export const AddNewItem: React.FC<handleKeyDownProps> = ({ handleKeyDown }) => {
  const inputRefAddNewList = useRef<HTMLInputElement>(null);

  const handleClickFocusAddNewItem = () => {
    if (inputRefAddNewList.current !== null) {
      inputRefAddNewList.current.focus();
    }
  };

  return (
    <div>
      <h1 className="h1-add-new-item">add new</h1>
      <div className="field" onClick={handleClickFocusAddNewItem}>
        <input
          type="text"
          placeholder="Add a new to-do..."
          ref={inputRefAddNewList}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};
