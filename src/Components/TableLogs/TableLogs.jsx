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
  TablePagination,
} from "@mui/material";
import { useState } from "react";

export default function TableLogs({ logs = [] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reseta para a primeira página ao alterar o limite por página
  };

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
            {logs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => {
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
                      {new Date(log.createdAt).toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1E293B",
                      }}
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

      <TablePagination
        component="div"
        count={logs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Itens por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
        sx={{ borderTop: "1px solid #E2E8F0" }}
      />
    </Paper>
  );
}
