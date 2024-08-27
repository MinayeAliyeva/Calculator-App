import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        marginTop: "0rem",
        color: isDarkMode ? "#fff" : "#000",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, color 0.3s ease",
        display: "flex",
        alignItems: "center",
      }}
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <MdOutlineLightMode size={24} />
      ) : (
        <MdOutlineDarkMode size={24} />
      )}
    </div>
  );
};

export default ThemeToggle;
