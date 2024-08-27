import { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import Display from "./Display";
import CalcBtn from "./Button";
import ThemeToggle from "./ThemeToogle";
import { evaluateExpression } from "../helpers/evaluateExpression";
import { HandlerKey, THandlers } from "../types/interface";
import {
  boxSxStyleDarkMood,
  boxSxStyleLightMood,
  buttons,
  operators,
} from "../constants/constands";
import { HistoryDrawer } from "./HistoryDrawer";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operations, setOperations] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addOperationToMemory = useCallback((operation: string) => {
    setOperations((prevOps) => [...prevOps, operation]);
  }, []);

  const handleClearClick = useCallback(() => {
    setDisplay((prev) => prev.slice(0, -1) || "0");
  }, []);

  const handleAllClearClick = useCallback(() => {
    setDisplay("0");
    setOperations([]);
  }, []);

  const handlePercentageClick = useCallback(() => {
    try {
      if (!display || display === "0") {
        setDisplay("0");
        return;
      }

      if (display.includes("%")) {
        let expression = display.slice(0, -1);
        const result = evaluateExpression(`${expression}/100`).toString();
        setDisplay(result);
        addOperationToMemory(`${display} = ${result}`);
      } else {
        setDisplay(display + "%");
      }
    } catch (error) {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handleSquareRootClick = useCallback(() => {
    try {
      if (display === "0" || display === "") {
        setDisplay("√");
        return;
      }
      const expression = `√(${display})`;
      const evaluated = evaluateExpression(expression);
      setDisplay(`${expression} = ${evaluated}`);
      addOperationToMemory(`${expression} = ${evaluated}`);
    } catch (error) {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handlePowClick = useCallback(
    (exponent: number) => {
      try {
        const result = `${display}^${exponent}`;
        const evaluated = evaluateExpression(result);
        setDisplay(evaluated.toString());
        addOperationToMemory(`${result} = ${evaluated}`);
      } catch (error) {
        setDisplay("Error");
      }
    },
    [display, addOperationToMemory]
  );

  const handleValueClick = useCallback((value: string) => {
    setDisplay((prev) => {
      const lastOperatorIndex = Math.max(
        prev.lastIndexOf("+"),
        prev.lastIndexOf("-"),
        prev.lastIndexOf("*"),
        prev.lastIndexOf("/")
      );
      const lastNumber = prev.slice(lastOperatorIndex + 1);

      if (value === "√") {
        return prev ? `√(${prev})` : "√";
      }

      if ((prev === "0" || prev === "") && value === "-") {
        return value;
      }

      if (operators.includes(value) && (prev === "" || prev === "0")) {
        return `0${value}`;
      }

      if (prev === "0" && !operators.includes(value) && value !== ".") {
        return value;
      }

      if (value === ".") {
        if (prev === "" || prev === "0") {
          return "0.";
        }
        if (lastNumber.includes(".")) {
          return prev;
        }
      }

      if (operators.includes(value) && operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + value;
      }

      if (
        value === "." &&
        (prev === "" || operators.includes(prev.slice(-1)))
      ) {
        return prev + "0.";
      }

      if (prev.startsWith("√") && value !== "√") {
        return prev + value;
      }

      return prev + value;
    });
  }, []);

  const handleEqual = useCallback(() => {
    try {
      if (display.includes("/0")) {
        setDisplay("Error");
        return;
      }

      const result = evaluateExpression(display);
      if (isNaN(result) || !isFinite(result)) {
        setDisplay("Error");
      } else {
        addOperationToMemory(`${display} = ${result}`);
        setDisplay(result.toString());
      }
    } catch {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handlers: THandlers = useMemo(
    () => ({
      "=": handleEqual,
      C: handleClearClick,
      AC: handleAllClearClick,
      "%": handlePercentageClick,
      "√": handleSquareRootClick,
      "^2": () => handlePowClick(2),
      "^3": () => handlePowClick(3),
    }),
    [
      handleEqual,
      handleClearClick,
      handleAllClearClick,
      handlePercentageClick,
      handleSquareRootClick,
      handlePowClick,
    ]
  );

  const handleClick = useCallback(
    (value: string) => {
      if (handlers[value as HandlerKey]) {
        handlers[value as HandlerKey]();
      } else {
        handleValueClick(value);
      }
    },
    [handlers, handleValueClick]
  );

  const handleDrawerOpen = () => setDrawerOpen(true);

  const counOfMemort = operations.length;

  return (
    <>
      <ThemeToggle />
      <Box
        sx={{
          width: 400,
          margin: "auto",
          paddingTop: 5,
          color: isDarkMode ? "#fff" : "#000",
          borderRadius: 2,
          position: "relative",
        }}
      >
        <Box sx={isDarkMode ? boxSxStyleDarkMood : boxSxStyleLightMood}>
          <Display
            display={display}
            isDarkMode={isDarkMode}
            onHistoryClick={handleDrawerOpen}
            counOfMemory={counOfMemort}
          />
          {buttons.map((value: string) => (
            <CalcBtn
              onClick={() => handleClick(value)}
              key={value}
              content={value}
            />
          ))}
        </Box>

        <HistoryDrawer
          setOperations={setOperations}
          operations={operations}
          counOfMemort={counOfMemort}
          setDrawerOpen={setDrawerOpen}
          drawerOpen={drawerOpen}
        />
      </Box>
    </>
  );
};

export default Calculator;
