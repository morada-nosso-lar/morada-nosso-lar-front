import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleIcon from "@mui/icons-material/People";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#F8FAFC !important",
            color: "#000",
          },
        }}
      >
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
                <HomeOutlinedIcon sx={{ color: "#F8FAFC", width: "90px" }} />
              </Box>

              <Box className="text-header">
                <Typography
                  variant="subtitle1"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    color: "#1E293B",
                  }}
                >
                  Morada Nosso Lar
                </Typography>

                <Typography
                  sx={{
                    color: "#7F8C8D",
                    fontSize: "12px",
                    mt: "-6px",
                  }}
                >
                  Gestão de Medicamentos
                </Typography>
              </Box>
            </Box>

            <Divider />

            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/dashboard")} sx={{ borderRadius: "8px", transition: "all 0.3s ease" }}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText>Pacientes</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate("/notification")} sx={{ borderRadius: "8px", transition: "all 0.3s ease" }}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText>Notificações</ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => navigate("/settings")}
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
                onClick={signOut}
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
      </Drawer>

      {/* ÁREA PRINCIPAL: Onde as páginas vão carregar (agora com flexGrow e padding) */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
