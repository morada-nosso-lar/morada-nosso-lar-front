import { Avatar, Button, Paper, Chip } from "@mui/material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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

      <Paper
        variant="outlined"
        sx={{
          mt: "10px",
          ml: "10px",
          mr: "10px",
          p: "3px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mt: "10px",
            mb: "10px",
            ml: "10px",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#007AFF",
              width: 56,
              height: 56,
            }}
          >
            <PersonIcon sx={{ fontSize: "32px", color: "#FFF" }} />
          </Avatar>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, color: "#1C1C1E" }}
            >
              Rogerio ceni
            </Typography>

            <Chip
              label="Status: 2 Criticos"
              size="small"
              sx={{
                bgcolor: "#FEE2E2",
                color: "#DC2626",
                fontSize: "11px",
                width: "fit-content",
                height: "24px",
              }}
            />
          </Box>
        </Box>

        {/* Margem direita aumentada para afastar o telefone do botão */}
        <Box
          sx={{ display: "flex", gap: 3, mt: "10px", mb: "10px", mr: "100px" }}
        >
          <Box
            sx={{
              bgcolor: "#F3F4F6",
              borderRadius: "8px",
              p: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <CalendarTodayOutlinedIcon
              sx={{ color: "#6B7280", fontSize: "20px" }}
            />

            <Box>
              <Typography sx={{ fontSize: "11px", color: "#6B7280" }}>
                Idade
              </Typography>
              <Typography
                sx={{ fontSize: "13px", fontWeight: 500, color: "#1C1C1E" }}
              >
                78 anos
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#F3F4F6",
              borderRadius: "8px",
              p: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <BadgeOutlinedIcon sx={{ color: "#6B7280", fontSize: "20px" }} />

            <Box>
              <Typography sx={{ fontSize: "11px", color: "#6B7280" }}>
                CPF
              </Typography>
              <Typography
                sx={{ fontSize: "13px", fontWeight: 500, color: "#1C1C1E" }}
              >
                000.000.000.-00
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "#F3F4F6",
              borderRadius: "8px",
              p: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <PhoneOutlinedIcon sx={{ color: "#6B7280", fontSize: "20px" }} />

            <Box>
              <Typography sx={{ fontSize: "11px", color: "#6B7280" }}>
                Telefone
              </Typography>
              <Typography
                sx={{ fontSize: "13px", fontWeight: 500, color: "#1C1C1E" }}
              >
                (00) 00000-0000
              </Typography>
            </Box>
          </Box>
        </Box>

        <Button
          startIcon={<EditOutlinedIcon />}
          sx={{
            position: "absolute",
            top: "8px",
            right: "10px",
            color: "#6B7280",
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 500,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
          }}
        >
          Editar
        </Button>
      </Paper>
    </>
  );
}