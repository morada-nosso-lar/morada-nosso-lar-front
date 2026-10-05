import PatientProfileCard from "../../Components/PatientProfileCard/PatientProfileCard";
import ItemTable from "../../Components/itemTable/itemTable";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

export default function EstoquePaciente() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          ml: "10px",
          mr: "10px",
          mt: "5px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/dashboard")}
            sx={{ color: "#6B7280" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontSize: "24px",
                fontWeight: 600,
                color: "#1C1C1E",
                letterSpacing: "-0.5px",
              }}
            >
              Estoque do paciente
            </Typography>

            <Typography
              sx={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                color: "#8E8E93",
                marginTop: "2px",
              }}
            >
              Gerencie medicamentos e quantidades
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#007BFF",
            color: "#FFF",
            textTransform: "none",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
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

      <PatientProfileCard />

      <ItemTable />
    </>
  );
}
