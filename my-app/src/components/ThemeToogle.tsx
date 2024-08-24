import { MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";


const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <MdOutlineDarkMode
      style={{
        marginTop: "1rem",
        backgroundColor: isDarkMode ? "#444" : "#ddd",
        color: isDarkMode ? "#fff" : "#000",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        margin: "20px",
      }}
      onClick={toggleTheme}
    />
  );
};

export default ThemeToggle;
