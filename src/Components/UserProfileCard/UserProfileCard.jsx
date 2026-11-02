import { useEffect, useState } from "react";
import { Paper, Box, Typography, Avatar, Skeleton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { authService } from "../../services/authService";

export default function UserProfileCard() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const resposta = await authService.getMe();
        if (resposta?.success) {
          setUsuario(resposta.user);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário", error);
      } finally {
        setLoading(false);
      }
    }

    carregarPerfil();
  }, []);

  if (loading) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 2.5, borderRadius: "12px", borderColor: "#C4CEDB", mb: 3 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="circular" width={56} height={56} />
          <Box>
            <Skeleton variant="text" width={140} height={24} />
            <Skeleton variant="text" width={200} height={20} />
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: "12px",
        borderColor: "#C4CEDB",
        bgcolor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
    >
      {/* Avatar com a inicial do nome ou ícone fallback */}
      <Avatar
        sx={{
          width: 56,
          height: 56,
          bgcolor: "#0A192F",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "22px",
        }}
      >
        {usuario?.name ? usuario.name.charAt(0).toUpperCase() : <PersonIcon />}
      </Avatar>

      {/* Informações de Nome e Email */}
      <Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.2,
          }}
        >
          {usuario?.name || "Usuário do Sistema"}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#64748B", mt: 0.5 }}>
          {usuario?.email || "email@nao-informado.com"}
        </Typography>
      </Box>
    </Paper>
  );
}