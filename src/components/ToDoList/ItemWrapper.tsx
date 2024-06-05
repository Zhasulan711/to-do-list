import React, { useState, useEffect } from "react";

import { TrashIcon } from "../Icons/TrashIcon";
import { ItemWrapperProps } from "../../shared/interfaces/ItemWrapperProps";
import { removeLocalStorageItem } from "../../shared/util/removeStorageItem";

export const ItemWrapper: React.FC<ItemWrapperProps> = ({
  items,
  setItems,
  searchInput,
}) => {
  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);

  // Get activeIndexes from localStorage
  useEffect(() => {
    const localStorageActiveIndexes = JSON.parse(
      localStorage.getItem("activeIndexes") || "[]"
    );

    setActiveIndexes(localStorageActiveIndexes);
  }, []);

  const handleClickToggleClass = (targetIndex: number) => {
    setActiveIndexes((prevIndexes) => {
      if (prevIndexes.includes(targetIndex)) {
        // Remove active indexes from localStorage
        removeLocalStorageItem("activeIndexes", targetIndex, 1);

        // Update state with active indexes removed
        return prevIndexes.filter((i) => i !== targetIndex);
      } else {
        // Add active indexes to localStorage
        localStorage.setItem(
          "activeIndexes",
          JSON.stringify([...activeIndexes, targetIndex])
        );

        // Update state with active indexes added
        return [...prevIndexes, targetIndex];
      }
    });
  };

  const handleRemove = (targetIndex: number) => {
    // Update state with items removed
    const updatedItems = items.filter((item, index) => index !== targetIndex);
    setItems(updatedItems);

    // Update state with active indexes removed
    const updatedActiveIndexes = activeIndexes
      .filter((index) => index !== targetIndex)
      .map((index) => (index > targetIndex ? index - 1 : index));
    setActiveIndexes(updatedActiveIndexes);

    // Remove item from localStorage
    removeLocalStorageItem("item", targetIndex, 2);

    // Remove activity indexes from localStorage
    removeLocalStorageItem("activeIndexes", targetIndex, 3);
  };

  return (
    <div className="to-do-items-wrapper">
      {items
        .filter((item) =>
          item.toLowerCase().includes(searchInput.toLowerCase())
        )
        .map((item, index) => {
          const originalIndex = items.indexOf(item);
          const isActive = activeIndexes.includes(originalIndex);
          const ItemToggleClassState = isActive ? "-completed" : "";

          return (
            <div key={originalIndex}>
              <div
                className={`to-do-item${ItemToggleClassState}`}
                onClick={() => handleClickToggleClass(originalIndex)}
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
