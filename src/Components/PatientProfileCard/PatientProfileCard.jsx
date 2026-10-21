import { Avatar, Paper, Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// Função utilitária interna para formatar CPF
function formatCPF(val) {
  if (!val) return "Não informado";
  const digits = String(val).replace(/\D/g, "");
  if (digits.length !== 11) return val; // Se já vier formatado ou fora do padrão, exibe o valor original
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função utilitária interna para formatar Telefone
function formatTelefone(val) {
  if (!val) return "Não informado";
  const digits = String(val).replace(/\D/g, "");
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return val; // Fallback se já estiver formatado
}

export default function PatientProfileCard({
  paciente,
  medicamentos = [],
  loading,
  onEditClick,
}) {
  const criticosCount = medicamentos.filter(
    (item) => Number(item.quantidade) <= 3,
  ).length;
  const hasCriticos = criticosCount > 0;

  const nomePaciente =
    paciente?.nome ||
    paciente?.nomeCompleto ||
    paciente?.nome_completo ||
    "Paciente não encontrado";

  const cpfValue = paciente?.cpf;

  const telefoneValue =
    paciente?.telefone ||
    paciente?.telefone_contato ||
    paciente?.contato ||
    paciente?.telefoneContato;

  const observacoesMedicas =
    paciente?.observacoesMedicas ?? paciente?.observacoes_medicas;
  const hasObservacoesMedicas =
    typeof observacoesMedicas === "string" && observacoesMedicas.trim() !== "";

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 1.5,
        mb: 3,
        p: { xs: 2, sm: 3 },
        borderRadius: "16px",
        border: "1px solid #DCE4EE",
        boxShadow: "0 4px 16px rgba(15, 35, 65, 0.04)",
        bgcolor: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2.5,
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
            width: 64,
            height: 64,
            flexShrink: 0,
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
              fontSize: { xs: "16px", sm: "18px" },
              fontWeight: 600,
              lineHeight: 1.4,
              color: "#172B4D",
              overflowWrap: "anywhere",
            }}
          >
            {loading ? "Carregando..." : nomePaciente}
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
              fontWeight: 700,
              width: "fit-content",
              height: "22px",
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
        {/* Idade */}
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            px: 1.75,
            py: 1.5,
            minHeight: 64,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <CalendarTodayOutlinedIcon
            sx={{ color: "#6B7280", fontSize: "20px" }}
          />
          <Box>
            <Typography
              sx={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}
            >
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

        {/* CPF */}
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            px: 1.75,
            py: 1.5,
            minHeight: 64,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <BadgeOutlinedIcon sx={{ color: "#6B7280", fontSize: "20px" }} />
          <Box>
            <Typography
              sx={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}
            >
              CPF
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 500, color: "#1C1C1E" }}
            >
              {loading ? "--" : formatCPF(cpfValue)}
            </Typography>
          </Box>
        </Box>

        {/* Telefone */}
        <Box
          sx={{
            bgcolor: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            px: 1.75,
            py: 1.5,
            minHeight: 64,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
          }}
        >
          <PhoneOutlinedIcon sx={{ color: "#6B7280", fontSize: "20px" }} />
          <Box>
            <Typography
              sx={{ fontSize: "11px", fontWeight: 400, color: "#6B7280" }}
            >
              Telefone
            </Typography>
            <Typography
              sx={{ fontSize: "13px", fontWeight: 500, color: "#1C1C1E" }}
            >
              {loading ? "--" : formatTelefone(telefoneValue)}
            </Typography>
          </Box>
        </Box>

        {/* Botão de Edição */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            aria-label="Editar perfil do paciente"
            onClick={onEditClick}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              bgcolor: "#F1F5F9",
              color: "#1976D2",
              "&:hover": {
                bgcolor: "#DBEAFE",
              },
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Observações Médicas */}
      <Box
        sx={{
          bgcolor: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          p: { xs: 2, sm: 2.5 },
          flex: "1 0 100%",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 600,
            color: "#475569",
            mb: 1,
          }}
        >
          Observações Médicas:
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: 1.7,
            fontWeight: 400,
            color: "#334155",
            overflowWrap: "anywhere",
            whiteSpace: "pre-wrap",
          }}
        >
          {hasObservacoesMedicas
            ? observacoesMedicas
            : "Esse paciente não possui observações adicionais."}
        </Typography>
      </Box>
    </Paper>
  );
}