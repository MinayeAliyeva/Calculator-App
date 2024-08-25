import "./App.css";
import Calculator from "./components/Calculator";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { isDarkMode }: any = useTheme();
  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode "} `}>
      <Calculator />
    </div>
  );
}

export default App;
