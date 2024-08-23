import { useCallback, useState } from "react";
import CalcBtn from "./Button";
import { Box } from "@mui/material";
import { evaluateExpression } from "../helpers/evaluateExpression";
import { useTheme } from "../context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const { isDarkMode, toggleTheme } = useTheme();

  const handleEqual = useCallback(() => {
    try {
      const returnStrFromEval = evaluateExpression(display)?.toString();
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

  const handlePowClick = useCallback((exponent: number) => {
    try {
      const poweredNum = Math.pow(parseFloat(display), exponent)?.toString();
      setDisplay(poweredNum);
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, [display]);

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
        case "^2":
          handlePowClick(2);
          break;
        case "^3":
          handlePowClick(3);
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
      handlePowClick,
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
    "^2",
    "^3",
    "=",
  ];

  return (
    <>
      <MdOutlineDarkMode
        style={{
          marginTop: "1rem",
          backgroundColor: isDarkMode ? "#444" : "#ddd",
          color: isDarkMode ? "#fff" : "#000",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease, color 0.3s ease",
          margin: "20px",
        }}
        onClick={toggleTheme}
      />
      <Box
        sx={{
          width: 300,
          margin: "auto",
          paddingTop: 5,
          color: isDarkMode ? "#fff" : "#000",
          borderRadius: 2,
        }}
      >
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
              backgroundColor: isDarkMode ? "#555" : "#ddd",
              padding: 2,
              textAlign: "right",
              fontSize: 24,
              borderRadius: 1,
              mb: 2,
              transition: "background-color 0.3s ease",
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
    </>
  );
};

export default Calculator;
