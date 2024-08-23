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
    switch (operator) {
      case "+":
        values.push(a + b);
        break;
      case "-":
        values.push(a - b);
        break;
      case "*":
        values.push(a * b);
        break;
      case "/":
        values.push(a / b);
        break;
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  };

  const evaluateExpression = (expression: string) => {
    const operators: string[] = [];
    const values: number[] = [];
    let num = "";

    const getPrecedence = (op: string) => {
      interface IOperators {
        [key: string]: number;
      }
      const obj: IOperators = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
      };

      return obj?.[op];
    };

    const applyOperatorWithPrecedence = (minPrecedence: number) => {
      while (
        operators.length &&
        getPrecedence(operators[operators.length - 1]) >= minPrecedence
      ) {
        applyOperator(values, operators.pop()!);
      }
    };

    for (const char of expression) {
      if ("0123456789.".includes(char)) {
        num += char;
      } else {
        if (num) {
          values.push(parseFloat(num));
          num = "";
        }
        if (char === "(") {
          operators.push(char);
        } else if (char === ")") {
          while (operators.length && operators[operators.length - 1] !== "(") {
            applyOperatorWithPrecedence(1);
            applyOperator(values, operators.pop()!);
          }
          operators.pop(); // Remove '('
        } else if ("*/".includes(char)) {
          applyOperatorWithPrecedence(2);
          operators.push(char);
        } else if ("+-".includes(char)) {
          applyOperatorWithPrecedence(1);
          operators.push(char);
        }
      }
    }
    if (num) {
      values.push(parseFloat(num));
    }
    applyOperatorWithPrecedence(1);
    return values.pop()!;
  };

  const handleEqual = () => {
    try {
      setDisplay(String(evaluateExpression(display)));
    } catch {
      setDisplay("Error");
    }
  };

  const handleClearClick = () => {
    setDisplay((prev) => prev?.slice(0, -1));
  };

  const handleAllClearClick = () => {
    setDisplay("");
  };

  const handlePercentageClick = () => {
    try {
      setDisplay((display) => String(parseFloat(display) / 100));
    } catch (error) {
      setDisplay(`${error}`);
    }
  };

  const handleSquareRootClick = () => {
    try {
      setDisplay((display) => String(Math.sqrt(parseFloat(display))));
    } catch (error) {
      setDisplay(`${error}`);
    }
  };

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
