import { Box } from "@mui/material";
import { IDisplay } from "../types/interface";


const Display = ({ display, isDarkMode }: IDisplay) => {
  return (
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
        overflow:"scroll"
      }}
    >
      {display || "0"}
    </Box>
  );
};

export default Display;
