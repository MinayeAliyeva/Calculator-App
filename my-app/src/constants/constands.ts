export const buttons = [
  "AC",
  "C",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "√",
  "^2",
  "^3",
  "(",
  ")",
  "=",
];
export const operators = ["+", "-", "*", "/"];
export const boxSxStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 1,
  width: " 100%",
  padding: "20px",
  borderRadius: "10px",
};

export const boxSxStyleDarkMood = {
  ...boxSxStyle,
  backgroundColor: "#fff",
};
export const boxSxStyleLightMood = {
  ...boxSxStyle,
  backgroundColor: "#000",
};
