import { useCallback, useMemo, useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Drawer,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
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

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operations, setOperations] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addOperationToMemory = useCallback((operation: string) => {
    setOperations((prevOps) => [...prevOps, operation]);
  }, []);

  const handleClearClick = useCallback(() => {
    setDisplay((prev) => prev.slice(0, -1));
  }, []);

  const handleAllClearClick = useCallback(() => {
    setDisplay("");
    setOperations([]);
  }, []);

  const handlePercentageClick = useCallback(() => {
    try {
      const result = (parseFloat(display) / 100).toString();
      addOperationToMemory(`${display} % = ${result}`);
      setDisplay(result);
    } catch (error) {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handleSquareRootClick = useCallback(() => {
    try {
      if (!display) {
        setDisplay("0");
        return;
      }
      const result = Math.sqrt(parseFloat(display)).toString();
      addOperationToMemory(`√${display} = ${result}`);
      setDisplay(result);
    } catch (error) {
      setDisplay("Error");
    }
  }, [display, addOperationToMemory]);

  const handlePowClick = useCallback(
    (exponent: number) => {
      try {
        if (!display) {
          setDisplay("0");
          return;
        }
        const base = parseFloat(display);
        const poweredNum = Math.pow(base, exponent);
        const result = poweredNum.toString();
        addOperationToMemory(`${display} ^ ${exponent} = ${result}`);
        setDisplay(result);
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

      if ((prev.slice(0, 1) === "0" || !prev) && value === "-") {
        return value;
      }
      if (operators?.includes(value) && (prev === "" || prev === "0")) {
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
      if (operators?.includes(value) && operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + value;
      }
      if (
        value === "." &&
        (prev === "" || operators.includes(prev.slice(-1)))
      ) {
        return prev + "0.";
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
  const handleDrawerClose = () => setDrawerOpen(false);
  const deleteInsideDrawer = () => {
    setOperations([]);
  };

  const isButtonDisabled = operations.length === 0;

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
          />
          {buttons?.map((value: string) => (
            <CalcBtn
              onClick={() => handleClick(value)}
              key={value}
              content={value}
            />
          ))}
        </Box>
        <Drawer
          anchor="bottom"
          open={drawerOpen}
          onClose={handleDrawerClose}
          sx={{
            position: "fixed",
            bottom: 0,
            width: "450px",
            zIndex: 1300,
            "& .MuiDrawer-paper": {
              width: "100%",
              maxWidth: "460px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              marginLeft: "520px",
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
              color: isDarkMode ? "#e0e0e0" : "#333",
              height: "80vh",
              overflowY: "auto",
            }}
          >
            <Typography variant="h6" mb={2}>
              Memory
            </Typography>
            {operations.length > 0 ? (
              <List
                sx={{
                  backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
                  borderRadius: 2,
                  padding: 2,
                  color: isDarkMode ? "#e0e0e0" : "#333",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                }}
              >
                {operations.map((operation, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      borderRadius: 1,
                      padding: "8px 12px",
                      marginBottom: "8px",
                      backgroundColor: isDarkMode ? "#444" : "#fff",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: isDarkMode ? "#555" : "#eaeaea",
                      },
                    }}
                  >
                    {operation}
                  </ListItem>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    disabled={isButtonDisabled}
                    onClick={deleteInsideDrawer}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </List>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? "#e0e0e0" : "#333",
                  textAlign: "center",
                }}
              >
                No operations
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 2,
              backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
            }}
          >
            <IconButton
              aria-label="history"
              color="primary"
              onClick={handleDrawerOpen}
            ></IconButton>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default Calculator;
