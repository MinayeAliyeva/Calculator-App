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
export type HandlerKey = "=" | "C" | "AC" | "%" | "√" | "^2" | "^3";


export type THandlers = Record<string, () => void>;
export type TOperations=Record<string, (a: number, b: number) => number>