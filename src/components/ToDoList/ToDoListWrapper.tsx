import React, { useState } from "react";

import "../../styles/root/ToDoList.scss";
import { TrashIcon } from "../Icons/TrashIcon";
import { SearchText } from "./SearchText";
import { AddNewItem } from "./AddNewItem";

export const ToDoList = () => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [items, setItems] = useState<string[]>(["Swimming pool"]);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleClickToggleClass = (index: number) => {
    setActiveIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      setItems([...items, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    } else {
      return null;
    }
  };

  const handleRemove = (targetIndex: number) => {
    const updatedIndexes = items.filter((item, index) => index !== targetIndex);
    setItems(updatedIndexes);

    const updatedActiveIndexes = activeIndexes.filter(
      (index) => index !== targetIndex
    );
    setActiveIndexes(updatedActiveIndexes);
  };

  return (
    <div className="to-do-list-wrapper">
      <SearchText setSearchInput={setSearchInput} />

      {items
        .filter((item) =>
          item.toLowerCase().includes(searchInput.toLowerCase())
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
      <AddNewItem handleKeyDown={handleKeyDown} />
    </div>
  );
};
