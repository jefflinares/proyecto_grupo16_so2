import { useState, useMemo } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router as Wouter } from "wouter";
import Router from "./Router";
import { NavBar, Footer } from "./components";

const { useMediaQuery } = require("@material-ui/core");

function App() {
  const [prefersDarkMode, updatePrefers] = useState(
    useMediaQuery("(prefers-color-scheme: dark)"),
  );

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode],
  );

  const changeTheme = () => {
    updatePrefers(!prefersDarkMode);
  };

  return (
    <Wouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar changeTheme={changeTheme} />
        <main>
          <Router />
        </main>
        <Footer />
      </ThemeProvider>
    </Wouter>
  );
}

export default App;
