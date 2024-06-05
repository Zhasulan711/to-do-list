import { useState, useEffect } from "react";

import "../../styles/root/ToDoList.scss";

import { SearchText } from "./SearchText";
import { AddNewItem } from "./AddNewItem";
import { ItemWrapper } from "./ItemWrapper";

export const ToDoListWrapper = () => {
  const [items, setItems] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  // Get items from localStorage
  useEffect(() => {
    const initialItems = ["Swimming pool"];
    const localStorageItems = JSON.parse(
      localStorage.getItem("item") || JSON.stringify(initialItems)
    );

    setItems(localStorageItems);
  }, []);

  return (
    <div className="to-do-list-wrapper">
      <SearchText setSearchInput={setSearchInput} />

      <ItemWrapper
        items={items}
        setItems={setItems}
        searchInput={searchInput}
      />
      <AddNewItem items={items} setItems={setItems} />
    </div>
  );
};
