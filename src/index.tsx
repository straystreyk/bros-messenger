import * as React from "react";
import * as ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { CacheProvider } from "@emotion/react";

import "./index.css";
import { Store, StoreType, ThemeType } from "./store";
import { MUITheme } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeContext } from "./Providers/theme";

const container = document.getElementById("app");
const cache = MUITheme.createEmotionCache();
const store = new Store(window._SSR_STORE_);

const useMain = ({ store }: { store: StoreType }) => {
  const [mode, setMode] = React.useState<ThemeType>(store.state.theme);

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: ThemeType) => {
          const currentTheme = prevMode === "light" ? "dark" : "light";
          document.cookie = `theme=${currentTheme}`;
          localStorage.setItem("theme", currentTheme);
          return currentTheme;
        });
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(MUITheme.getDesignTokens(mode)),
    [mode]
  );

  return {
    theme,
    colorMode,
  };
};

const Main = () => {
  const { theme, colorMode } = useMain({ store });

  return (
    <BrowserRouter>
      <CacheProvider value={cache}>
        <ThemeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <App store={store} />
            <CssBaseline />
          </ThemeProvider>
        </ThemeContext.Provider>
      </CacheProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.hydrateRoot(container, <Main />);
