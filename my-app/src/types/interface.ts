
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




export type THandlers=Record<HandlerKey, () => void>
export type TOperators=Record<string,number>
export type Toperations=Record<string, (a: number, b: number) => number> 

