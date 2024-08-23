import { useCallback, useState } from "react";
import CalcBtn from "./Button";
import { Box } from "@mui/material";
import {
  applyOperator,
  evaluateExpression,
} from "../helpers/evaluateExpression";
const Calculator = () => {
  const [display, setDisplay] = useState("");
  const handleEqual = useCallback(() => {
    try {
      const returnStrFromEval = String(evaluateExpression(display));
      setDisplay(returnStrFromEval);
    } catch {
      setDisplay("Error");
    }
  }, [display]);

  const handleClearClick = useCallback(() => {
    setDisplay((prev) => prev?.slice(0, -1));
  }, []);

  const handleAllClearClick = useCallback(() => {
    setDisplay("");
  }, []);

  const handlePercentageClick = useCallback(() => {
    try {
      setDisplay((display) => String(parseFloat(display) / 100));
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, []);

  const handleSquareRootClick = useCallback(() => {
    try {
      setDisplay((display) => String(Math.sqrt(parseFloat(display))));
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, []);

  const handleValueClick = useCallback((value: string) => {
    setDisplay((prev) => prev + value);
  }, []);

  const handleClick = useCallback(
    (value: string) => {
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
    },
    [
      handleEqual,
      handleClearClick,
      handleAllClearClick,
      handlePercentageClick,
      handleSquareRootClick,
      handleValueClick,
    ]
  );

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
