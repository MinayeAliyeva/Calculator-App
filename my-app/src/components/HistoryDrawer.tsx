
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

export default Drawer;
