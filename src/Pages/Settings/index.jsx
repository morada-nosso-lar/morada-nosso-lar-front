import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import TableLogs from "../../Components/TableLogs/TableLogs";
import { logsService } from "./../../services/log";
import { useEffect, useState } from "react";
import UserProfileCard from "../../Components/UserProfileCard/UserProfileCard";

export default function Settings() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function carregarLogs() {
      setLoading(true);

      try {
        const resposta = await logsService.listar();

        if (resposta.success) {
          setLogs(resposta.data);
        }
      } catch (error) {
        console.error("Erro ao buscar os logs do sitema", error);
      } finally {
        setLoading(false);
      }
    }

    carregarLogs();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => navigate("/dashboard")}>
          <ArrowBackIcon />
        </IconButton>

        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "20px", sm: "22px", md: "24px" },
              fontWeight: 600,
              color: "#1C1C1E",
              letterSpacing: "-0.5px",
            }}
          >
            Configurações
          </Typography>

          <Typography sx={{ fontSize: "14px", color: "#8E8E93" }}>
            configurações do sistema e controle de logs de auditoria.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <UserProfileCard />

        <TableLogs logs={logs} loading={loading}></TableLogs>
      </Box>
    </>
  );
}
