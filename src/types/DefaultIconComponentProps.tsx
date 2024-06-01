export type DefaultIconComponentProps = {
  width?: string | number;
  height?: string | number;
  onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
};

export interface SearchTextProps {
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface ItemWrapperProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  searchInput: string;
}

export interface AddNewItemProps {
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
}
