import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",

    body1: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontSize: "0.875rem",
    },

    h1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
    },

    number: {
      fontFamily: "'Roboto Mono', monospace", 
      fontWeight: 600,
      fontSize: "1.25rem",
    },
  },

  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(15, 23, 42, 0.45)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        },
      },
    },
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
