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
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          className="header"
          sx={{ display: "flex", mt: "20px", mb: "10px" }}
        >
          <Box
            className="icon"
            sx={{
              backgroundColor: "#1976D2",
              borderRadius: "8px",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: "12px",
              ml: "8px",
            }}
          >
            <HomeOutlinedIcon
              sx={{ color: "#F8FAFC", width: 24, height: 24 }}
            />
          </Box>

          <Box className="text-header">
            <Typography
              variant="subtitle1"
              component="h1"
              sx={{ fontWeight: "bold", color: "#1E293B" }}
            >
              Morada Nosso Lar
            </Typography>

            <Typography
              sx={{ color: "#7F8C8D", fontSize: "12px", mt: "-6px" }}
            >
              Gestão de Medicamentos
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/dashboard")}
              sx={{ borderRadius: "8px", transition: "all 0.3s ease" }}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText>Pacientes</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/notification")}
              sx={{ borderRadius: "8px", transition: "all 0.3s ease" }}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText>Notificações</ListItemText>
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigateTo("/settings")}
              sx={{ borderRadius: "8px", transition: "all 0.3s ease" }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Configurações</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setMobileOpen(false);
              signOut();
            }}
            sx={{
              mx: 2,
              mb: 2,
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "#DC2626",
                "& .MuiListItemIcon-root": {
                  color: "#DC2626",
                },
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Sair</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isDesktop ? 250 : undefined,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#F5F5F5 !important",
            color: "#000",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: "100%", md: "calc(100% - 250px)" },
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
              sx={{ mb: 1 }}
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
