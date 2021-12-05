import "./App.css";
import { useState } from "react";
import Home from "./components/home";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
function App() {
  const [themeType, setThemeType] = useState("light");
  const switchThemes = () => {
    setThemeType((last) => (last === "dark" ? "light" : "dark"));
  };
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Home onClick={switchThemes} />
    </GeistProvider>
  );
}

export default App;
