import { Box, IconButton, List, ListItem, Typography } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";

interface MemoryProps {
  operations: string[];
  setOperations: React.Dispatch<React.SetStateAction<string[]>>;
  counOfMemort: number;
}

const Memory = ({ operations, setOperations, counOfMemort }: MemoryProps) => {
  const { isDarkMode } = useTheme();

  const deleteInsideDrawer = () => {
    setOperations([]);
  };

  const isButtonDisabled = operations.length === 0;

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: isDarkMode ? "#222" : "#f9f9f9",
        color: isDarkMode ? "#e0e0e0" : "#333",
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h6">Memory</Typography>
        <Typography variant="body1">Operation Count: {counOfMemort}</Typography>
      </Box>
      {operations.length > 0 ? (
        <List
          sx={{
            backgroundColor: isDarkMode ? "#333" : "#fff",
            borderRadius: 2,
            padding: 2,
            color: isDarkMode ? "#e0e0e0" : "#333",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {operations.map((operation: string, index: number) => (
            <ListItem
              key={index}
              sx={{
                borderRadius: 1,
                padding: "8px 12px",
                marginBottom: "8px",
                backgroundColor: isDarkMode ? "#444" : "#fff",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: isDarkMode ? "#555" : "#f0f0f0",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {operation}
              <IconButton
                aria-label="clear"
                color="error"
                onClick={() =>
                  setOperations((ops) => ops.filter((op, i) => i !== index))
                }
              >
                <ClearIcon />
              </IconButton>
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
  );
};

export default Memory;
