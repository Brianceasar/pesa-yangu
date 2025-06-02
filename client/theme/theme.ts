import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#001f3f", // Navy Blue
    },
    secondary: {
      main: "#0074D9", // Lighter  blue
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

export default theme;
