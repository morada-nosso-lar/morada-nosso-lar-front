import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function ItemTable() {
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: "10px",
          borderColor: "#C4CEDB",
          overflow: "hidden",
          bgcolor: "#FFF",
        }}
      ></Paper>

      <Box
        sx={{
          p: "16px 14px",
          display: "flex",
          borderBottom: "1px solid #E2E8F0",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography>Medicamentos</Typography>

        <Typography>4 items </Typography>
      </Box>
    </>
  );
}
