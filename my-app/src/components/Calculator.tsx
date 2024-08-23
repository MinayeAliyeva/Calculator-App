import { useCallback, useState } from "react";
import CalcBtn from "./Button";
import { Box } from "@mui/material";
import { evaluateExpression } from "../helpers/evaluateExpression";
const Calculator = () => {
  const [display, setDisplay] = useState("");
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
/*
display=1+4
expression="1+4"
const operatos=[];
const values=[];
for 
char=1
if(true) num=1
values=[]
if(false) else==>>if(true)=>values=[1] num=""
char=+ else if(true includes case)==> operators=[+]
num=4;
  if (num) {
    values.push(parseFloat(num));
  }
    values=[1,4]
    operators=[+]
minPrecedence=1
*/


/*
3*4+2
num=3
values=[3]
operators=[*]
values=[3,4]
operators=[]
values=[12]
operators=[+]
values=[12,2]
*/
