import { Avatar, Button, Paper, Chip } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function PatientProfileCard() {
  return (
    <>
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
