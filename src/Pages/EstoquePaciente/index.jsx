import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

export default function EstoquePaciente() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        ml: "10px",
        mr: "10px",
        mt: "5px",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          fontSize: "24px",
          fontWeight: 600,
          color: "#1C1C1E",
          letterSpacing: "-0.5px",
        }}
      >
        Estoque do paciente
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          bgcolor: "#007BFF",
          color: "#FFF",
          textTransform: "none",
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: "8px",
          px: 3,
          "&:hover": { bgcolor: "#0069D9", boxShadow: "none" },
        }}
      >
        Adicionar Item
      </Button>
    </Box>
  );
}
