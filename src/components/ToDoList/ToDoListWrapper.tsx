import React, { useState, useRef } from "react";

import "../../styles/root/ToDoList.scss";
import { TrashIcon } from "../Icons/TrashIcon";
// import { SearchText } from "./SearchText";
// import { AddNewItem } from "./AddNewItem";

export const ToDoList = () => {
  const [items, setItems] = useState<String[]>(["Swimming Pool"]);
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const inputRefSearchText = useRef<HTMLInputElement>(null);
  const inputRefAddNewItem = useRef<HTMLInputElement>(null);

  const handleClickFocusSearch = () => {
    if (inputRefSearchText.current !== null) {
      inputRefSearchText.current.focus();
    }
  };

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

  const handleClickToggleClass = (index: number) => {
    setActiveIndexes((prevIndex) =>
      prevIndex.includes(index)
        ? prevIndex.filter((i) => i !== index)
        : [...prevIndex, index]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchInputValue(value);
  };

  const handleRemove = (targetIndex: number) => {
    const updatedIndex = items.filter((item, index) => index !== targetIndex);
    setItems(updatedIndex);

    const updatedActiveIndexes = activeIndexes.filter(
      (index) => index !== targetIndex
    );
    setActiveIndexes(updatedActiveIndexes);
  };

  return (
    <div className="to-do-list-wrapper">
      <div>
        <h1>Search</h1>
        <div className="field" onClick={handleClickFocusSearch}>
          <input
            type="text"
            placeholder="Enter your search item.."
            ref={inputRefSearchText}
            value={searchInputValue}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {items
        .filter((item) =>
          item.toLowerCase().includes(searchInputValue.toLowerCase())
        )
        .map((item, index) => {
          const isActive = activeIndexes.includes(index);
          const ItemToggleClassState = isActive ? "-completed" : "";

          return (
            <div key={index} className="to-do-item-wrapper">
              <div
                className={`to-do-item${ItemToggleClassState}`}
                onClick={() => handleClickToggleClass(index)}
              >
                <div className="to-do-item-flex">
                  <h2>{item}</h2>
                  <TrashIcon
                    onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                      e.stopPropagation();
                      handleRemove(index);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      <div>
        <h1 className="h1-add-new-item">add new</h1>
        <div className="field" onClick={handleClickFocusAddNewItem}>
          <input
            type="text"
            placeholder="Add a new to-do..."
            ref={inputRefAddNewItem}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};
