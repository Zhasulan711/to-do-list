import React, { useState, useEffect } from "react";

import { TrashIcon } from "../Icons/TrashIcon";
import { ToDoItemWrapperProps } from "../../interfaces/ToDoItemWrapperProps";

export const ToDoItemWrapper: React.FC<ToDoItemWrapperProps> = ({
  items,
  setItems,
  searchInput,
}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>(items);

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [items, searchInput]);

  const handleClickToggleClass = (index: number) => {
    setActiveIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
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
    <div className="to-do-items-wrapper">
      {filteredItems.map((item, index) => {
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
    </div>
  );
};
