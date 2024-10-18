export interface HeaderLinks {
  label: string;
  code: string;
  url: string;
  action: (i: number) => void;
  active: boolean;
  dropdown: DropdownItem[];
}

export interface DropdownItem {
  id: string;
  name: string;
}
