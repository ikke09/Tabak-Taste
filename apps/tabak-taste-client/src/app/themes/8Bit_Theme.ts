import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#6078C3",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FE00DD",
    },
    info: {
      main: "#D8E9DC",
    },
    warning: {
      main: "#29E7CD",
    },
    success: {
      main: "#4B5842",
    },
    error: {
      main: "#A31621",
    },
  },
});

export default Theme;
