export interface ToDoItemWrapperProps {
    items: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
    searchInput: string;
  }