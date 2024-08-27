import { useCallback, useState, useMemo } from "react";
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
import ThemeToggle from "./ThemeToogle";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operations, setOperations] = useState<string[]>([]);
  const { isDarkMode } = useTheme();
  const [open, setOpen] = useState(false);

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
      console.log("prev", prev);
      console.log("display", display);

      const lastNumber = prev.slice(lastOperatorIndex + 1); //+

      if ((prev.slice(0, 1) === "0" || !prev) && value === "-") {
        return value;
      }
      // eger operator gelerse ve evvelki deyer sifir yada " " olarsa sifiri qoru
      if (operators?.includes(value) && (prev === "" || prev === "0")) {
        return `0${value}`;
      }
      // Eğer 0-in uzerine gelen deyerdise ve . deyilse sifiri degisdir bu rakamla
      if (prev === "0" && !operators.includes(value) && value !== ".") {
        return value;
      }
      // Eğer `value` "." ise ve önceki değer "" veya "0" ise, "0." ekle
      if (value === ".") {
        if (prev === "" || prev === "0") {
          return "0.";
        }
        if (lastNumber.includes(".")) {
          return prev; // Eğer son rakamda zaten "." varsa değiştirme
        }
      }
      // Eğer işlem operatörü ekleniyorsa ve önceki karakter işlem operatörü ise, sonuncusunu değiştir
      if (operators?.includes(value) && operators.includes(prev.slice(-1))) {
        return prev.slice(0, -1) + value;
      }
      // Eğer başında "." varsa, "0" ekleyin
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteInsideModal = () => {
    setOperations([]);
  };

  const isButtonDisabled = operations.length === 0;

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
          minWidth:"400px"
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
