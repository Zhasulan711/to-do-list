import React, { useState, useEffect } from "react";

import { TrashIcon } from "../Icons/TrashIcon";
import { ItemWrapperProps } from "../../interfaces/ItemWrapperProps";

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
        const localStorageActiveIndexes = JSON.parse(
          localStorage.getItem("activeIndexes") || "[]"
        );
        const removingLocalStorageActiveIndexes =
          localStorageActiveIndexes.filter(
            (index: number) => index !== targetIndex
          );
        localStorage.setItem(
          "activeIndexes",
          JSON.stringify(removingLocalStorageActiveIndexes)
        );

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
    const updatedActiveIndexes = activeIndexes.filter(
      (index) => index !== targetIndex
    );
    setActiveIndexes(updatedActiveIndexes);

    // Remove item from localStorage
    const initialItems = ["Swimming pool"];
    const localStorageItems = JSON.parse(localStorage.getItem("item") || JSON.stringify(initialItems));
    const removingLocalStorageItem = localStorageItems.filter(
      (item: string, index: number) => index !== targetIndex
    );

    localStorage.setItem("item", JSON.stringify(removingLocalStorageItem));

    // Remove activity indexes from localStorage
    const localStorageActiveIndexes = JSON.parse(
      localStorage.getItem("activeIndexes") || "[]"
    );
    const removingLocalStorageActiveIndexes = localStorageActiveIndexes.filter(
      (index: number) => index !== targetIndex
    );
    localStorage.setItem(
      "activeIndexes",
      JSON.stringify(removingLocalStorageActiveIndexes)
    );
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
            <div key={index} className="to-do-item-wrapper">
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
