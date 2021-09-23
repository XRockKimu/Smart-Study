import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      light: "#757ce8",
      main: "#42a5f5",
      dark: "#BB86FC",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      dark: "#03DAC6",
      contrastText: "#000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#BB86FC",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
    },
    background: {
      paper: "#0D1B2A",
      default: "#0D1B2A",
    },
  },
});

export { darkTheme, lightTheme };
