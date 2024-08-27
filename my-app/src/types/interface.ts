export interface IBtn {
  content: string;
  onClick: () => void;
}
export interface IDisplay {
  display: string;
  isDarkMode: boolean;
  counOfMemory: number;
}

export interface IMemory {
  operations: string[];
  isDarkMode: boolean;
}
export interface ICalckBtn {
  content: string;
  onClick: () => void;
}

export type HandlerKey = "=" | "C" | "AC" | "%" | "√" | "^2" | "^3";
export type THandlers = Record<HandlerKey, () => void>;
export type TOperators = Record<string, number>;
export type Toperations = Record<string, (a: number, b: number) => number>;
export interface IHistoryDrawer {
  setDrawerOpen: (open: boolean) => void;
  drawerOpen: boolean;
  counOfMemort: number;
  operations: string[];
  setOperations: React.Dispatch<React.SetStateAction<string[]>>;
}
