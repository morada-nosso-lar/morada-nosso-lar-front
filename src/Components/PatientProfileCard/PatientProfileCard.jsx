import { Avatar, Paper, Chip } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";

export default function PatientProfileCard({
  paciente,
  medicamentos = [],
  loading,
}) {
  const criticosCount = medicamentos.filter(
    (item) => Number(item.quantidade) <= 3,
  ).length;
  const hasCriticos = criticosCount > 0;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          mt: "10px",
          mb: "30px",
          p: 3,
          borderRadius: "16px",
          border: "1px solid #C4CEDB",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
          bgcolor: "#FFFFFF",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flex: "1 1 auto",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#0F4C81",
              width: 56,
              height: 56,
            }}
          >
            <PersonIcon sx={{ fontSize: "32px", color: "#FFF" }} />
          </Avatar>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#1C1C1E",
                overflowWrap: "anywhere",
              }}
            >
              {loading
                ? "Carregando..."
                : paciente?.nome || "Paciente não encontrado"}
            </Typography>

            <Chip
              label={
                hasCriticos
                  ? `Status: ${criticosCount} Crítico(s)`
                  : "Status: Regular"
              }
              size="small"
              sx={{
                bgcolor: hasCriticos ? "#FEE2E2" : "#DCFCE7",
                color: hasCriticos ? "#DC2626" : "#16A34A",
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
            justifyContent: "flex-start",
            gap: 2,
            flexWrap: "wrap",
            flex: "0 1 auto",
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
