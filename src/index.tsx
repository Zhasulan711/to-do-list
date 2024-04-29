import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { ToDoList } from "./components/ToDoLIst/ToDoList";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToDoList />
  </React.StrictMode>
);
