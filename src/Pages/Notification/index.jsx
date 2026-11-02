import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Pagination,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import NotificationItem from "../../Components/NotificationItem/NotificationItem";
import { notificacaoService } from "../../services/notificaçao";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Notification() {
  const navigate = useNavigate();

  const [abaAtiva, setAbaAtiva] = useState(0);
  const [notificacoes, setNotificacoes] = useState([]);
  const [naoLidasCount, setNaoLidasCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const totalPagina = Math.ceil(notificacoes.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const notificacoesExibidas = notificacoes.slice(inicio, fim);

  const handleTrocarDeAba = (event, novoValor) => {
    setAbaAtiva(novoValor);

    setPaginaAtual(1);
  };

  useEffect(() => {
    let isMounted = true;

    const buscarDados = async () => {
      setLoading(true);

      try {
        const resposta = await notificacaoService.listar({
          lida: abaAtiva === 1,
        });

        if (isMounted && resposta.success) {
          setNotificacoes(resposta.data);

          setNaoLidasCount(resposta.nao_lidas || 0);
        }
      } catch (error) {
        console.error("Erro ao carregar notificações", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

      buscarDados();

    return () => {
      isMounted = false;
    };
  }, [abaAtiva]);

  const handleMarcarComoLida = async (id, novoStatusLida) => {
    try {
      const resposta = await notificacaoService.marcarComoLida(
        id,

        novoStatusLida,
      );

      if (resposta.success) {
        setNotificacoes((prev) => prev.filter((item) => item.id !== id));

        // Atualiza a contagem do badge

        setNaoLidasCount((prev) =>
          Math.max(0, novoStatusLida ? prev - 1 : prev + 1),
        );
      }
    } catch (error) {
      console.error("Erro ao alterar status da notificação", error);
    }
  };

  const handleExcluir = async (id) => {
    try {
      const resposta = await notificacaoService.excluir(id);

      if (resposta.success) {
        setNotificacoes((prev) => prev.filter((item) => item.id !== id));

        if (abaAtiva === 0) {
          setNaoLidasCount((prev) => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error("Erro ao deletar notificação", error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          onClick={() => navigate("/dashboard")}
          sx={{ color: "#6B7280" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "20px", sm: "22px", md: "24px" },
              fontWeight: 600,
              color: "#1C1C1E",
              letterSpacing: "-0.5px",
            }}
          >
            Central de Notificação
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#8E8E93" }}>
            Visualização centralizada de alertas de estoque e movimentações da
            unidade.
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          mt: 3,
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#0A192F",
            borderBottom: "1px solid #E2E8F0",
            px: { xs: 1, sm: 2 },
          }}
        >
          <Tabs
            value={abaAtiva}
            onChange={handleTrocarDeAba}
            sx={{
              minHeight: 56,

              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                backgroundColor: "#FFF",
              },

              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.65)",
                minHeight: 56,
                minWidth: 110,
                px: 2,
                transition: "color 0.2s ease",

                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                },

                "&.Mui-selected": {
                  color: "#FFFFFF",
                  fontWeight: 700,
                },
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>Não Lidas</span>

                  {naoLidasCount > 0 && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 22,
                        height: 20,
                        //px: 0.75,
                        borderRadius: "10px",
                        backgroundColor: "#B91C1C",
                        color: "#fff",
                        fontSize: "11px",
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {naoLidasCount}
                    </Box>
                  )}
                </Box>
              }
            />

            <Tab label="Lidas" />
          </Tabs>
        </Box>

        <Box sx={{ minHeight: 300 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
              <CircularProgress size={32} />
            </Box>
          ) : notificacoes.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Nenhuma notificação {abaAtiva === 0 ? "não lida" : "lida"} no
                momento.
              </Typography>
            </Box>
          ) : (
            notificacoesExibidas.map((item) => (
              <NotificationItem
                key={item.id}
                notificacao={item}
                onMarcaComoLida={handleMarcarComoLida}
                onExcluir={handleExcluir}
              />
            ))
          )}
        </Box>

        {!loading && notificacoes.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              borderTop: "1px solid #E2E8F0",
              backgroundColor: "#0A192F",
            }}
          >
            <Pagination
              count={totalPagina}
              page={paginaAtual}
              onChange={(event, novaPagina) => setPaginaAtual(novaPagina)}
              color="primary"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                  },

                  // Página atual selecionada
                  "&.Mui-selected": {
                    backgroundColor: "#1976D2",
                    color: "#FFFFFF",
                    fontWeight: 700,

                    "&:hover": {
                      backgroundColor: "#1565C0",
                    },
                  },
                },

                "& .MuiPaginationItem-ellipsis": {
                  color: "rgba(255, 255, 255, 0.5)",
                },
              }}
            />
          </Box>
        )}
      </Paper>
    </>
  );
}
