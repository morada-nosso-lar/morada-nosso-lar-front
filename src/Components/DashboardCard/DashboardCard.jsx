import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function DashboardCard({ title, value }) {
  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: "10px", flex: 1, borderColor: "#C4CEDB", p: 2.5, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)"}}
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
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#1E293B"
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}
