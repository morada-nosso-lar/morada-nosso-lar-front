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
          icone: <WarningAmberIcon sx={{ color: "#D97706", fontSize: 22 }} />,
        };

      case "PACIENTE_DESATIVADO":
        return {
          icone: <PersonOffIcon sx={{ color: "#EF4444", fontSize: 22 }} />,
        };

      case "SISTEMA":
      default:
        return {
          icone: <InfoOutlinedIcon sx={{ color: "#3B82F6", fontSize: 22 }} />,
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
        p: 2.5,
        // Linha divisória mais visível (tom Slate 200)
        borderBottom: "1px solid #E2E8F0",
         borderLeft: "1px solid #E2E8F0",
         borderRight: "1px solid #E2E8F0",
        backgroundColor: lida ? "#FFFFFF" : "#F8FAFC",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "#F1F5F9",
        },
        
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2,  }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#FFF",
            border: "1px solid #E2E8F0",
           
            boxShadow: "0 2px 5px rgba(15, 23, 42, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {estilo.icone}
        </Box>

        <Box sx={{}}>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: lida ? "334155" : "0F172A",
              lineHeight: 1.3,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {titulo}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              mb: 0.5,
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.4,
              mt: "3px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {mensagem}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "#94A3B8",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              mt: 0.25,
            }}
          >
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
