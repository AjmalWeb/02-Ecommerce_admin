import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/Themecolors";
import Routesmap from "./routesfolder/Routesmap";





function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routesmap />
      </div>
    </ThemeProvider>
  );
}

export default App;
