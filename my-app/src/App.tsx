
import "./App.css";
import Calculator from "./components/Calculator";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { isDarkMode }: any = useTheme();
  return (
    <div className="App">
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
