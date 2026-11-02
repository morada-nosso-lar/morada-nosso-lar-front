import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";

export default function TableLogs({ logs = [] }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "12px",
        borderColor: "#C4CEDB",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      <Box sx={{ p: 2.5, borderBottom: "1px solid #E2E8F0" }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 700, color: "#0F172A" }}
        >
          Tabela de Logs
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 680, tableLayout: "fixed" }}>
          <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
            <TableRow>
              <TableCell
                align="left"
                sx={{
                  width: "180px",
                  color: "#64748B",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                DATA / HORA
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  width: "180px",
                  color: "#64748B",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                USUÁRIO
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  width: "140px",
                  color: "#64748B",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                AÇÃO
              </TableCell>

              <TableCell
                align="left"
                sx={{ color: "#64748B", fontWeight: "bold", fontSize: "12px" }}
              >
                DESCRIÇÃO
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logs.map((log) => {
              return (
                <TableRow
                  key={log.id}
                  hover
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="left"
                    sx={{ fontSize: "13px", color: "#64748B" }}
                  >
                    {log.createdAt}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "14px", fontWeight: 600, color: "#1E293B" }}
                  >
                    {log.usuarioNome}
                  </TableCell>
                  <TableCell align="center">{log.acao}</TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "14px", color: "#334155" }}
                  >
                    {log.descricao}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
