import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ItemTable({ medicamentos = [], onDelete, onUpdateQuantidade }) {
  return (
    <Box
      sx={{
        width: "calc(100% - 20px)",
        maxWidth: "100%",
        minWidth: 0,
        mx: "10px",
        boxSizing: "border-box",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          borderRadius: "10px",
          borderColor: "#C4CEDB",
          overflow: "hidden",
          bgcolor: "#FFF",
        }}
      >
        {/* Cabeçalho da Tabela com Contador Dinâmico */}
        <Box
          sx={{
            p: "16px 24px",
            display: "flex",
            borderBottom: "1px solid #E2E8F0",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 600, color: "#1E293B" }}>
            Medicamentos / Produtos
          </Typography>

          <Typography
            sx={{ color: "#6B7280", fontSize: "14px", fontWeight: 500 }}
          >
            {medicamentos.length} items
          </Typography>
        </Box>

        {/* Estrutura da Tabela Material-UI */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ width: "100%", maxWidth: "100%", borderRadius: 0, border: "none" }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
              <TableRow>
                <TableCell
                  sx={{ color: "#64748B", fontWeight: "bold", fontSize: "12px" }}
                >
                  MEDICAMENTO
                </TableCell>
                <TableCell
                  sx={{ color: "#64748B", fontWeight: "bold", fontSize: "12px" }}
                >
                  CATEGORIA
                </TableCell>
                <TableCell
                  sx={{ color: "#64748B", fontWeight: "bold", fontSize: "12px" }}
                >
                  QUANTIDADE
                </TableCell>
                <TableCell
                  sx={{ color: "#64748B", fontWeight: "bold", fontSize: "12px" }}
                >
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {medicamentos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4, color: "#6B7280" }}>
                    Nenhum item cadastrado no estoque.
                  </TableCell>
                </TableRow>
              ) : (
                medicamentos.map((item) => {
                  // Regra de alerta: se a quantidade for menor ou igual a 2 (conforme regra da API) ou 4
                  const isCritico = item.quantidade <= 2;

                  return (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: isCritico ? "#DC2626" : "#1E293B",
                          }}
                        >
                          {item.nome}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={item.categoria}
                          size="small"
                          sx={{
                            backgroundColor: "#F1F5F9",
                            color: "#475569",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            aria-label={`Diminuir quantidade de ${item.nome}`}
                            disabled={item.quantidade === 0}
                            onClick={() =>
                              onUpdateQuantidade(item, item.quantidade - 1)
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: isCritico ? "#DC2626" : "#1E293B",
                            }}
                          >
                            {item.quantidade} unid.
                          </Typography>
                          <IconButton
                            size="small"
                            aria-label={`Aumentar quantidade de ${item.nome}`}
                            onClick={() =>
                              onUpdateQuantidade(item, item.quantidade + 1)
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                        >
                          {/* Botão de Excluir integrado com a API */}
                          <IconButton
                            size="small"
                            sx={{ color: "#94A3B8", ml: 1 }}
                            onClick={() => onDelete(item.id)}
                          >
                            <DeleteOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}