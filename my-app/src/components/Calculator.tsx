import { useCallback, useState, useMemo, useEffect } from "react";
import CalcBtn from "./Button";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import { evaluateExpression } from "../helpers/evaluateExpression";
import { useTheme } from "../context/ThemeContext";
import Display from "./Display";
import HistoryIcon from "@mui/icons-material/History";
import DeleteIcon from "@mui/icons-material/Delete";

import { HandlerKey, THandlers } from "../types/interface";
import {
  boxSxStyleDarkMood,
  boxSxStyleLightMood,
  buttons,
  modalStyle,
  operators,
} from "../constants/constands";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [operations, setOperations] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);

  const addOperationToMemory = useCallback((operation: string) => {
    setOperations((prevOps) => [...prevOps, operation]);
  }, []);

  const handleEqual = useCallback(() => {
    try {
      const returnStrFromEval = evaluateExpression?.(display)?.toString();
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
      const result = (parseFloat(display) / 100).toString();
      addOperationToMemory(`${display} % = ${result}`);
      setDisplay(result);
    } catch (error) {
      setDisplay(`${error}`);
    }
  }, [display, addOperationToMemory]);

  const handleSquareRootClick = useCallback(() => {
    try {
      const result = Math.sqrt(parseFloat(display)).toString();
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
      const prevOperator = prev.slice(-1);
      if (operators.includes(value) && operators.includes(prevOperator)) {
        return prev.slice(0, -1) + value;
      }
      //5+=
  
      console.log("prev", prev); //5+=
      console.log("value", value);//=
      if (operators.includes(prevOperator) && value === "=") {
        console.log("girdi");
      }
      return prev + value;
    });
  }, []);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteInsideModal = () => {
    setOperations([]);
  };

  const isButtonDisabled = operations.length === 0;

  return (
    <>
      {/* <ThemeToggle /> */}
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
          {buttons?.map((value: string) => (
            <CalcBtn
              onClick={() => handleClick(value)}
              key={value}
              content={value}
            />
          ))}
        </Box>
        <Box
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
          sx={{ display: "flex" }}
        >
          <HistoryIcon />
          <Typography>View previous actions</Typography>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <h1 style={{ fontSize: "15px" }}>Memory</h1>
            {operations.length > 0 ? (
              <List
                sx={{
                  mt: 2,
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "13px" }}>
                    Clear All Memory
                  </Typography>

                  <IconButton
                    onClick={deleteInsideModal}
                    aria-label="delete"
                    disabled={isButtonDisabled}
                    style={{ color: "#E6A500" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </List>
            ) : (
              <Typography>No previous operations</Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Calculator;
