import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },

  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflowX: "auto",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          "@media (max-width: 599.95px)": {
            width: "calc(100% - 32px)",
            maxWidth: "none",
            margin: "16px",
          },
        },
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;
