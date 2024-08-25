import { useCallback, useState } from "react";
import CalcBtn from "./Button";
import { Box, Button, List, ListItem } from "@mui/material";
import { evaluateExpression } from "../helpers/evaluateExpression";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToogle";
import Display from "./Display";
import {
  boxSxStyleDarkMood,
  boxSxStyleLightMood,
  buttons,
  operators,
} from "../constants/constands";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [operations, setOperations] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const [showMemory, setShowMemory] = useState(false);

  const addOperationToMemory = useCallback((operation: string) => {
    setOperations((prevOps) => [...prevOps, operation]);
  }, []);

  const handleEqual = useCallback(() => {
    try {
      const returnStrFromEval = evaluateExpression?.(display)?.toString(); //16
      addOperationToMemory(`${display} = ${returnStrFromEval}`);
      setDisplay(returnStrFromEval);
    } catch {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handleClearClick = useCallback(() => {
    setDisplay((prev) => prev?.slice(0, -1));
  }, []);

  const handleAllClearClick = useCallback(() => {
    setDisplay("");
    setOperations([]);
  }, []);

  const handlePercentageClick = useCallback(() => {
    try {
      const result = String(parseFloat(display) / 100);
      addOperationToMemory(`${display} % = ${result}`);
      setDisplay(result);
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, [display, addOperationToMemory]);

  const handleSquareRootClick = useCallback(() => {
    try {
      const result = String(Math.sqrt(parseFloat(display)));
      addOperationToMemory(`√${display} = ${result}`);
      setDisplay(result);
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, [display, addOperationToMemory]);

  const handlePowClick = useCallback(
    (exponent: number) => {
      try {
        const poweredNum = Math.pow(parseFloat(display), exponent)?.toString();
        addOperationToMemory(`${display} ^ ${exponent} = ${poweredNum}`);
        setDisplay(poweredNum);
      } catch (error) {
        setDisplay(`${error}`);
      }
    },
    [display, addOperationToMemory]
  );

  const handleValueClick = useCallback((value: string) => {
    setDisplay((prev) => {
      if (operators.includes(value) && operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + value;
      }
      return prev + value;
    });
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

  return (
    <>
      <ThemeToggle />
      <Box
        sx={{
          width: 300,
          margin: "auto",
          paddingTop: 5,
          color: isDarkMode ? "#fff" : "#000",
          borderRadius: 2,
        }}
      >
        <Box sx={isDarkMode ? boxSxStyleDarkMood : boxSxStyleLightMood}>
          <Display display={display} isDarkMode={isDarkMode} />
          {buttons?.map((value) => (
            <CalcBtn
              onClick={() => handleClick(value)}
              key={value}
              content={value}
            />
          ))}
        </Box>
        <Button
          onClick={() => setShowMemory(!showMemory)}
          variant="contained"
          sx={{ mt: 2, bgcolor: isDarkMode ? "#666" : "#ccc" }}
        >
          Memory
        </Button>
        {showMemory && (
          <List
            sx={{
              mt: 2,
              backgroundColor: isDarkMode ? "#333" : "#fff",
              borderRadius: 2,
              padding: 2,
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            {operations.map((operation, index) => (
              <ListItem key={index}>{operation}</ListItem>
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default Calculator;
