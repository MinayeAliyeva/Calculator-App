export interface IOperators {
  [key: string]: number;
}
export interface IBtn {
  content: string;
  onClick: () => void;
}
export interface IDisplay {
  display: string;
  isDarkMode: boolean;
}

export interface IMemory {
  operations: string[];
  isDarkMode: boolean;
}
