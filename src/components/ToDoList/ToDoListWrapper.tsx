import { useState } from "react";

import "../../styles/root/ToDoList.scss";

import { SearchText } from "./SearchText";
import { AddNewItem } from "./AddNewItem";
import { ToDoItemWrapper } from "./TodoItemWrapper";

export const ToDoListWrapper = () => {
  const [items, setItems] = useState<string[]>(["Swimming pool"]);
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="to-do-list-wrapper">
      <SearchText setSearchInput={setSearchInput} />

      <ToDoItemWrapper
        items={items}
        setItems={setItems}
        searchInput={searchInput}
      />
      <AddNewItem items={items} setItems={setItems} />
    </div>
  );
};
