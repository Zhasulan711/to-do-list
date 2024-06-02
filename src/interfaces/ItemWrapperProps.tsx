export interface ItemWrapperProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  searchInput: string;
}
