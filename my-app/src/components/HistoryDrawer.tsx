import Memory from "./Memory";
import { Box, Drawer, IconButton } from "@mui/material";
import { useTheme } from "../context/ThemeContext";
import { IHistoryDrawer } from "../types/interface";

export const HistoryDrawer = ({
  setDrawerOpen,
  drawerOpen,
  counOfMemort,
  operations,
  setOperations,
}: IHistoryDrawer) => {
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const { isDarkMode } = useTheme();

  return (
    <Drawer
      anchor="bottom"
      open={drawerOpen}
      onClose={handleDrawerClose}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: "450px",
        zIndex: 1300,
        "& .MuiDrawer-paper": {
          width: "100%",
          maxWidth: "490px",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.2)",
        },
        "@media (max-width: 600px)": {
          "& .MuiDrawer-paper": {
            maxWidth: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          },
        },
      }}
    >
      <Memory
        counOfMemort={counOfMemort}
        operations={operations}
        setOperations={setOperations}
      />
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
  );
};

export default HistoryDrawer;
