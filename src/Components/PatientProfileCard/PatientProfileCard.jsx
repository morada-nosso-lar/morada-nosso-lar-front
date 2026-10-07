import { Avatar, Paper, Chip } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";

export default function PatientProfileCard({ paciente, loading }) {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          mt: "10px",
          ml: "10px",
          mr: "10px",
          mb: "30px",
          p: "3px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
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
              {loading
                ? "Carregando..."
                : paciente?.nome || "Paciente não encontrado"}
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 2,
            flexWrap: "wrap",
            mt: "10px",
            mb: "10px",
          }}
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
                {loading
                  ? "--"
                  : paciente?.idade
                    ? `${paciente.idade} anos`
                    : "Idade não informada"}
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
                000.000.000-00
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
      </Paper>
    </>
  );
}
