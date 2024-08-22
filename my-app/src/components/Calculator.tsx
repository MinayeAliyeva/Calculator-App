import { useState } from "react";
import CalcBtn from "./Button";
import { Box } from "@mui/material";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const handleEqual = () => {
    console.log("handleEqual");
  };
  const handleClearClick = () => {
    console.log("handleClearClick");
  };
  const handleAllClearClick = () => {
    console.log("handleAllClearClick");
  };
  const handlePercentageClick = () => {
    console.log("handlePercentageClick");
  };
  const handleSquareRootClick = () => {
    console.log("handleSquareRootClick");
  };
  const handleValueClick = (value: string) => {
    console.log("handleValueClick");
    setDisplay((prev) => prev + value);
  };
  const handleClick = (value: string) => {
    console.log(`Butona tıklandı: ${value}`);
    switch (value) {
      case "=":
        handleEqual();
        break;
      case "C":
        handleClearClick();
        break;
      case "AC":
        handleAllClearClick();
        break;
      case "%":
        handlePercentageClick();
        break;
      case "√":
        handleSquareRootClick();
        break;
      default:
        handleValueClick(value);
        break;
    }
  };
  const buttons = [
    "AC",
    "DC",
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
    "=",
  ];
  return (
    <Box sx={{ width: 300, margin: "auto", paddingTop: 5 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
        }}
      >
        <Box
          sx={{
            gridColumn: "span 4",
            backgroundColor: "grey.200",
            padding: 2,
            textAlign: "right",
            fontSize: 24,
            borderRadius: 1,
            mb: 2,
          }}
        >
          0
        </Box>
        {buttons.map((value) => (
          <CalcBtn
            onClick={() => handleClick(value)}
            key={value}
            content={value}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Calculator;
