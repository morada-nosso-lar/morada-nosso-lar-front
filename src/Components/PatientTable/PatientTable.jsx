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



export default function PatientTable({pacientes}) {
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
          {pacientes.map((paciente) => (
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
                  {paciente.idade} anos
                </Typography>
              </TableCell>

              <TableCell>
                <Chip
                  icon={<Inventory2OutlinedIcon style={{ color: "#2563EB" }} />}
                  label={`${paciente.medicamentos} items`}
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
                    paciente.status === "ok" ? (
                      <CheckIcon style={{ color: "#16A34A" }} />
                    ) : (
                      <WarningAmberIcon style={{ color: "#DC2626" }} />
                    )
                  }
                  label={paciente.alertaMsg}
                  size="small"
                  sx={{
                    // Lógica das Cores: Verifica o status para pintar o fundo e a letra
                    backgroundColor:
                      paciente.status === "ok" ? "#DCFCE7" : "#FEE2E2",
                    color: paciente.status === "ok" ? "#16A34A" : "#DC2626",
                    fontWeight: 500,
                  }}
                />
              </TableCell>

              {/* Célula 5: Ações */}
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Botão de Estoque */}
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

                  {/* Ícones de Edição e Exclusão */}
                  <IconButton size="small" sx={{ color: "#64748B" }}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>

                  <IconButton size="small" sx={{ color: "#64748B" }}>
                    <DeleteOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
