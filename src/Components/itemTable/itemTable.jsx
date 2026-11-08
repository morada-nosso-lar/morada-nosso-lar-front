import { useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import InputBase from "@mui/material/InputBase";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";

/**
 * Célula de estoque mínimo editável inline.
 * - Clique no lápis (ou no valor) para editar.
 * - Pressione Enter ou clique no ✓ para salvar.
 * - Pressione Escape para cancelar.
 * - O valor é salvo automaticamente ao perder o foco (blur).
 */
function EstoqueMinimoCell({ item, onSave }) {
  const estoqueMinimo = item.estoqueMinimo ?? item.estoque_minimo ?? 3;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(estoqueMinimo));
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);

  const startEditing = () => {
    setValue(String(estoqueMinimo));
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleSave = async () => {
    const novoMin = parseInt(value, 10);
    if (isNaN(novoMin) || novoMin < 0) {
      setEditing(false);
      setValue(String(estoqueMinimo));
      return;
    }
    if (novoMin === estoqueMinimo) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(item, novoMin);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditing(false);
      setValue(String(estoqueMinimo));
    }
  };

  const isCritico = Number(item.quantidade) <= Number(estoqueMinimo);

  if (saving) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <CircularProgress size={14} sx={{ color: "#007BFF" }} />
        <Typography sx={{ fontSize: "12px", color: "#64748B" }}>
          Salvando...
        </Typography>
      </Box>
    );
  }

  if (editing) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <InputBase
          inputRef={inputRef}
          value={value}
          type="number"
          inputProps={{ min: 0, style: { textAlign: "center", padding: "2px 4px" } }}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          autoFocus
          sx={{
            width: 60,
            height: 28,
            bgcolor: "#EFF6FF",
            border: "1.5px solid #3B82F6",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#1E40AF",
            px: 0.5,
          }}
        />
        <Tooltip title="Salvar">
          <IconButton
            size="small"
            onMouseDown={(e) => e.preventDefault()} // evita blur antes do click
            onClick={handleSave}
            sx={{
              width: 24,
              height: 24,
              bgcolor: "#DCFCE7",
              color: "#16A34A",
              "&:hover": { bgcolor: "#BBF7D0" },
            }}
          >
            <CheckIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Tooltip title="Clique para alterar o estoque mínimo" placement="top">
      <Box
        onClick={startEditing}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          cursor: "pointer",
          borderRadius: "6px",
          px: 1,
          py: 0.5,
          width: "fit-content",
          "&:hover": {
            bgcolor: "#F1F5F9",
            "& .edit-icon": { opacity: 1 },
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: 600,
            color: isCritico ? "#DC2626" : "#475569",
          }}
        >
          {estoqueMinimo} unid.
        </Typography>
        <EditIcon
          className="edit-icon"
          sx={{
            fontSize: 13,
            color: "#94A3B8",
            opacity: 0,
            transition: "opacity 0.15s",
          }}
        />
      </Box>
    </Tooltip>
  );
}

export default function ItemTable({
  medicamentos = [],
  onDelete,
  onUpdateQuantidade,
  onUpdateEstoqueMinimo,
  loading = false,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          borderRadius: "16px",
          border: "1px solid #C4CEDB",
          boxShadow: "0 4px 16px rgba(15, 35, 65, 0.04)",
          overflow: "hidden",
          bgcolor: "#FFFFFF",
        }}
      >
        {/* Cabeçalho com contador */}
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Typography sx={{ minWidth: 0, fontWeight: 600, color: "#1E293B" }}>
            Medicamentos / Produtos
          </Typography>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "14px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {medicamentos.length} {medicamentos.length === 1 ? "item" : "itens"}
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            width: "100%",
            maxWidth: "100%",
            borderRadius: 0,
            border: "none",
          }}
        >
          <Table sx={{ minWidth: 620 }}>
            <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
              <TableRow>
                {["MEDICAMENTO", "CATEGORIA", "QUANTIDADE"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      py: 1.75,
                      px: 2.5,
                      bgcolor: "#F8FAFC",
                      color: "#64748B",
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.3px",
                      borderBottom: "1px solid #E2E8F0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    py: 1.75,
                    px: 2.5,
                    bgcolor: "#F8FAFC",
                    color: "#64748B",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.3px",
                    borderBottom: "1px solid #E2E8F0",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title="Clique no valor para editar" placement="top">
                    <span>EST. MÍNIMO ✏️</span>
                  </Tooltip>
                </TableCell>
                <TableCell
                  sx={{
                    color: "#64748B",
                    fontWeight: "bold",
                    fontSize: "12px",
                    borderBottom: "1px solid #E2E8F0",
                  }}
                >
                  AÇÕES
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <CircularProgress size={36} sx={{ color: "#0A192F" }} />
                  </TableCell>
                </TableRow>
              ) : medicamentos.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 4, color: "#6B7280" }}
                  >
                    Nenhum item cadastrado no estoque.
                  </TableCell>
                </TableRow>
              ) : (
                medicamentos.map((item) => {
                  const estoqueMinimo =
                    item.estoqueMinimo ?? item.estoque_minimo ?? 3;
                  const isCritico =
                    Number(item.quantidade) <= Number(estoqueMinimo);

                  return (
                    <TableRow
                      key={item.id}
                      hover
                      sx={{
                        "&:hover": { bgcolor: "#F8FAFC" },
                        "&:last-child td": { borderBottom: 0 },
                        transition: "background-color 0.2s ease",
                        bgcolor: isCritico ? "#FFF5F5" : "transparent",
                      }}
                    >
                      {/* Nome */}
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                        >
                          {isCritico && (
                            <Tooltip
                              title={`Estoque crítico! Mínimo: ${estoqueMinimo}`}
                            >
                              <WarningAmberIcon
                                sx={{ color: "#DC2626", fontSize: "16px" }}
                              />
                            </Tooltip>
                          )}
                          <Typography
                            sx={{
                              fontWeight: 500,
                              color: isCritico ? "#DC2626" : "#1E293B",
                            }}
                          >
                            {item.nome}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* Categoria */}
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

                      {/* Quantidade com +/- */}
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton
                            size="small"
                            aria-label={`Diminuir quantidade de ${item.nome}`}
                            disabled={item.quantidade === 0}
                            onClick={() =>
                              onUpdateQuantidade(item, item.quantidade - 1)
                            }
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "8px",
                              color: "#64748B",
                              "&:hover": { bgcolor: "#EAF2FF", color: "#1976D2" },
                              "&.Mui-disabled": { color: "#CBD5E1" },
                            }}
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
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "8px",
                              color: "#64748B",
                              "&:hover": { bgcolor: "#EAF2FF", color: "#1976D2" },
                              "&.Mui-disabled": { color: "#CBD5E1" },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>

                      {/* Estoque Mínimo — editável inline */}
                      <TableCell>
                        <EstoqueMinimoCell
                          item={item}
                          onSave={onUpdateEstoqueMinimo}
                        />
                      </TableCell>

                      {/* Ações */}
                      <TableCell>
                        <IconButton
                          size="small"
                          aria-label={`Excluir ${item.nome}`}
                          title={`Excluir ${item.nome}`}
                          onClick={() => onDelete(item.id)}
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: "8px",
                            color: "#94A3B8",
                            "&:hover": { bgcolor: "#FEF2F2", color: "#DC2626" },
                          }}
                        >
                          <DeleteOutlinedIcon fontSize="small" />
                        </IconButton>
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
