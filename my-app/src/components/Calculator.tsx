import { useState } from "react";
import CalcBtn from "./Button";
import { Box } from "@mui/material";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const applyOperator = (values: number[], operator: string) => {
    const b = values.pop();
    const a = values.pop();
    if (a === undefined || b === undefined) {
      throw new Error("Invalid expression");
    }
    if (operator === "+") values.push(a + b);
    if (operator === "-") values.push(a - b);
    if (operator === "*") values.push(a * b);
    if (operator === "/") values.push(a / b);
  };
  const evaluateExpression = (expression: string) => {
    const operators: string[] = [];
    const values: number[] = [];
    let num = "";
    for (const char of expression) {
      if ("0123456789.".includes(char)) {
        num += char;
      } else {
        if (num) {
          values.push(parseFloat(num));
          num = "";
        }
        if ("+-*/".includes(char)) {
          while (operators.length) {
            applyOperator(values, operators.pop()!);
          }
          operators.push(char);
        }
      }
    }
    if (num) {
      values.push(parseFloat(num));
    }
    while (operators.length) {
      applyOperator(values, operators.pop()!);
    }
    return values.pop();
  };

  /*
  12+5-6
  num=12
  values=[12,5]
  operators=[+]
  operator=-

  */

  const handleEqual = () => {
    try {
      setDisplay(String(evaluateExpression(display)));
    } catch {
      setDisplay("Error");
    }
  };

  const handleClearClick = () => {};

  const handleAllClearClick = () => {};

  const handlePercentageClick = () => {};

  const handleSquareRootClick = () => {};

  const handleValueClick = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  const handleClick = (value: string) => {
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
          {display || "0"}
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
