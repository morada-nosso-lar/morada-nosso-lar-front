import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export default function DashboardCard({ title, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        flex: 1,
        borderColor: "#C4CEDB",
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      <Box
        sx={{
          bgcolor: "#F8FAFC", // Cor de fundo do cabeçalho (ex: cinza muito claro)
          borderBottom: "1px solid #E2E8F0", // Linha divisória opcional
          px: 2.5, // Padding horizontal (substitui o que estava no Paper)
          py: 1.5, // Padding vertical
        }}
      >
        <Typography
          sx={{
            color: "#64748B",
            fontSize: "14px",
            mb: 1,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          px: 2.5, // Padding horizontal (substitui o que estava no Paper)
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1E293B",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
