import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function PatientTable({ pacientes, onDelete }) {
  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return "--";

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead sx={{ backgroundColor: "#F8FAFC" }}>
          <TableRow>
            <TableCell sx={{ color: "#64748B", fontWeight: "bold" }}>
              PACIENTE
            </TableCell>
            <TableCell sx={{ color: "#64748B", fontWeight: "bold" }}>
              IDADE
            </TableCell>
            <TableCell sx={{ color: "#64748B", fontWeight: "bold" }}>
              MEDICAMENTOS
            </TableCell>
            <TableCell sx={{ color: "#64748B", fontWeight: "bold" }}>
              ALERTAS
            </TableCell>
            <TableCell sx={{ color: "#64748B", fontWeight: "bold" }}>
              AÇÕES
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {pacientes.map((paciente) => {
            const statusSeguro = paciente.status || "ok";
            const alertaSeguro = paciente.alertaMsg || "OK";
            const qtdMedicamentos = paciente.medicamentos || 0;

            return (
              <TableRow key={paciente.id} hover>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#0F4C81",
                        width: 32,
                        height: 32,
                        fontSize: "14px",
                      }}
                    />

                    <Typography sx={{ fontWeight: 500, color: "#1E293B" }}>
                      {paciente.nome}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography sx={{ color: "#64748B" }}>
                    {calcularIdade(paciente.data_nascimento)} anos
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    icon={
                      <Inventory2OutlinedIcon style={{ color: "#2563EB" }} />
                    }
                    label={`${qtdMedicamentos} itens`}
                    size="small"
                    sx={{
                      backgroundColor: "#DBEAFE",
                      color: "#2563EB",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    icon={
                      statusSeguro === "ok" ? (
                        <CheckIcon style={{ color: "#16A34A" }} />
                      ) : (
                        <WarningAmberIcon style={{ color: "#DC2626" }} />
                      )
                    }
                    label={alertaSeguro}
                    size="small"
                    sx={{
                      backgroundColor:
                        statusSeguro === "ok" ? "#DCFCE7" : "#FEE2E2",
                      color: statusSeguro === "ok" ? "#16A34A" : "#DC2626",
                      fontWeight: 500,
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      icon={
                        <Inventory2OutlinedIcon style={{ color: "#2563EB" }} />
                      }
                      label="Estoque"
                      size="small"
                      sx={{
                        backgroundColor: "#DBEAFE",
                        color: "#2563EB",
                        fontWeight: 500,
                        cursor: "pointer",
                        "&:hover": { backgroundColor: "#BFDBFE" },
                      }}
                    />

                    <IconButton size="small" sx={{ color: "#64748B" }}>
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>

                    <IconButton 
                      size="small" 
                      sx={{ color: "#64748B" }} 
                      onClick={() => onDelete(paciente.id)}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}