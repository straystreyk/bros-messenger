import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";

import "./index.css";
import { Store } from "./store";
import { MUITheme } from "./theme";
import { createTheme } from "@mui/material/styles";

const container = document.getElementById("app");

const cache = MUITheme.createEmotionCache();

const ColorModeContext = React.createContext(null);

const store = new Store(window._SSR_STORE_);

const Main = () => {
  const [mode, setMode] = React.useState<"light" | "dark">("dark");

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: "light" | "dark") =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(MUITheme.getDesignTokens(mode)),
    [mode]
  );

  return (
    <BrowserRouter>
      <CacheProvider value={cache}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <App store={store} />
            <CssBaseline />
          </ThemeProvider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </BrowserRouter>
  );
};
const root = ReactDOM.hydrateRoot(container, <Main />);
