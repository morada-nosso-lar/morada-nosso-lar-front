import { Box, Typography, IconButton } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// Correção: Adicionado o "d" no final (CheckCircleOutlined)
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";

export default function NotificationItem({
  notificacao,
  onMarcaComoLida,
  onExcluir,
}) {
  const { id, tipo, titulo, mensagem, lida, createdAt } = notificacao;

  const getEstiloPorTipo = (tipo) => {
    switch (tipo) {
      case "ESTOQUE_BAIXO":
        return {
          icone: <WarningAmberIcon sx={{ color: "#EF4444" }} />,
          bgColor: "#FEE2E2",
        };

      case "PACIENTE_DESATIVADO":
        return {
          icone: <PersonOffIcon sx={{ color: "#6B7280" }} />,
          bgColor: "#F3F4F6",
        };

      case "SISTEMA":
      default:
        return {
          icone: <InfoOutlinedIcon sx={{ color: "#3B82F6" }} />,
          bgColor: "#DBEAFE",
        };
    }
  };

  const estilo = getEstiloPorTipo(tipo);

  const dataFormatada = new Date(createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #F3F4F6",
        p: 2,
        backgroundColor: lida ? "#FFFFFF" : "#F9FAFB",
        transition: "backgroundColor 0.2s",
        "&:hover": {
          backgroundColor: "#F3F4F6",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Container do Ícone */}
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {estilo.icone}
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: lida ? 500 : 700, color: "#111827" }}
          >
            {titulo}
          </Typography>

          <Typography variant="body2" sx={{ color: "#6B7280", mb: 0.5 }}>
            {mensagem}
          </Typography>

          <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
            {dataFormatada}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          title={lida ? "Marcar como não lida" : "Marcar como lida"}
          onClick={() => onMarcaComoLida(id, !lida)}
        >
          {lida ? (
            <MarkEmailUnreadIcon fontSize="small" sx={{ color: "#6B7280" }} />
          ) : (
            <CheckCircleOutlineIcon
              fontSize="small"
              sx={{ color: "#10B981" }}
            />
          )}
        </IconButton>

        <IconButton
          size="small"
          title="Excluir notificação"
          onClick={() => onExcluir(id)}
        >
          <DeleteOutlineIcon fontSize="small" sx={{ color: "#EF4444" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
