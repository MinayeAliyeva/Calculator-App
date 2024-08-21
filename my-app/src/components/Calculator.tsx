import CalcBtn from "./Button";
import { Box } from "@mui/material";

const Calculator = () => {
  const buttons = [
    "AC",
    "DC",
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
          0
        </Box>
        {buttons.map((btn) => (
          <CalcBtn key={btn} content={btn} />
        ))}
      </Box>
    </Box>
  );
};

export default Calculator;
