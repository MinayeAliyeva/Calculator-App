import { List, ListItem } from "@mui/material";
import { IMemory } from "../types/interface";

const Memory = ({ operations, isDarkMode }: IMemory) => {
  return (
    <List
      sx={{
        mt: 2,
        backgroundColor: isDarkMode ? "#333" : "#fff",
        borderRadius: 2,
        padding: 2,
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      {operations?.map((operation: string, index: number) => (
        <ListItem key={index}>{operation}</ListItem>
      ))}
    </List>
  );
};

export default Memory;
