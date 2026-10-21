import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/Img/LOGO.png";

const DRAWER_WIDTH = 260;

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useContext(AuthContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: "Pacientes", icon: <PeopleIcon />, path: "/dashboard" },
    {
      text: "Notificações",
      icon: <NotificationsIcon />,
      path: "/notification",
    },
    { text: "Configurações", icon: <SettingsIcon />, path: "/settings" },
  ];

  const navigateTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0A192F",
        color: "#F8FAFC",
        px: 2,
        py: 2.5,
      }}
    >
      {/* Header do App / Logótipo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 1,
          mb: 3,
        }}
      >
        {/* Renderização dimensionada do Logótipo */}
        <Box
          component="img"
          src={logo}
          alt="Logótipo Morada Nosso Lar"
          sx={{
            width: 50,
            height: 50,
            objectFit: "contain",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        />

        <Box sx={{ overflow: "hidden" }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: "15px",
              lineHeight: 1.2,
              letterSpacing: "-0.2px",
            }}
          >
            Morada Nosso Lar
          </Typography>

          <Typography
            sx={{
              color: "#94A3B8",
              fontSize: "11px",
              fontWeight: 500,
              mt: 0.3,
            }}
          >
            Gestão de Medicamentos
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 2 }} />

      {/* Navegação Principal */}
      <Box sx={{ flexGrow: 1 }}>
        <List sx={{ p: 0, display: "flex", flexDirection: "column", gap: 0.8 }}>
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/dashboard" &&
                location.pathname.startsWith(item.path));

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigateTo(item.path)}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    px: 1.5,
                    bgcolor: isActive
                      ? "rgba(0, 123, 255, 0.15)"
                      : "transparent",
                    color: isActive ? "#FFF" : "#94A3B8",
                    borderLeft: isActive
                      ? "3px solid #FFF"
                      : "3px solid transparent",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      bgcolor: isActive
                        ? "rgba(0, 123, 255, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                      color: isActive ? "#FFF" : "#F8FAFC",
                      "& .MuiListItemIcon-root": {
                        color: isActive ? "#FFF" : "#F8FAFC",
                        transform: "translateX(3px)",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#FFF" : "#94A3B8",
                      minWidth: "36px",
                      transition: "transform 0.2s ease, color 0.2s ease",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Rodapé - Botão de Sair */}
      <Box sx={{ pt: 2, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <ListItemButton
          onClick={() => {
            setMobileOpen(false);
            signOut();
          }}
          sx={{
            borderRadius: "10px",
            py: 1.2,
            px: 1.5,
            color: "#94A3B8",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: "rgba(239, 68, 68, 0.12)",
              color: "#EF4444",
              "& .MuiListItemIcon-root": {
                color: "#EF4444",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "#94A3B8", minWidth: "36px" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#F8FAFC",
      }}
    >
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isDesktop ? DRAWER_WIDTH : undefined,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            borderRight: "1px solid #E2E8F0",
            backgroundColor: "#0A192F",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            maxWidth: "1536px",
            mx: "auto",
            p: { xs: 2, sm: 3, md: 4 },
            boxSizing: "border-box",
          }}
        >
          {!isDesktop && (
            <IconButton
              aria-label="Abrir menu"
              onClick={() => setMobileOpen(true)}
              sx={{ mb: 1, color: "#1E293B" }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
