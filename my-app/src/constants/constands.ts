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

export const modalStyle = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius:"5px",
  boxShadow: 24,
  p: 4,
  
};