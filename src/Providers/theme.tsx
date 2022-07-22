import * as React from "react";
import { useTheme as useThemeMUI } from "@mui/material/styles";

export const ThemeContext = React.createContext(null);

export const useTheme = () => {
  const colorMode = React.useContext(ThemeContext);
  const theme = useThemeMUI();

  return {
    colorMode,
    theme,
  };
};
