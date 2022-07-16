import { deepOrange, red, deepPurple, lightGreen } from "@mui/material/colors";

// Create a theme instance.
export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#3fbaf5",
            contrastText: "#fff",
          },
          secondary: {
            main: "#19857b",
          },
          error: {
            main: red.A400,
          },
          // for more colors
          // neutral: {
          //   main: "#112233",
          //   contrastText: "yellow",
          // },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          secondary: deepPurple,
          success: lightGreen,
          error: {
            main: "#d50000",
          },
        }),
  },
});

// declare module "@mui/material/styles" {
//   // allow configuration using `createTheme`
//   interface PaletteOptions {
//     neutral?: PaletteOptions["primary"];
//   }
// }
