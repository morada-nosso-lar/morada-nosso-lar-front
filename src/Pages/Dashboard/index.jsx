import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./style.css";
import AddIcon from "@mui/icons-material/Add";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import PatientTable from "../../Components/PatientTable/PatientTable";
import PatientModal from "../../Components/PatientModal/PatientModal";
import { getPacientes, deletePaciente } from "../../services/pacientes";
import { getEstoque } from "../../services/estoque";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Dashboard() {
  const [pacientes, setpacientes] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [resposta, respostaEstoque] = await Promise.all([
          getPacientes(),
          getEstoque(),
        ]);

        if (resposta.success) {
          setpacientes(resposta.data);
        }
        const listaEstoque = Array.isArray(respostaEstoque)
          ? respostaEstoque
          : respostaEstoque?.data;
        setEstoque(Array.isArray(listaEstoque) ? listaEstoque : []);
      } catch (error) {
        console.error("erro ao carregar dados do paciente", error);
      }
    }

    carregar();
  }, []);

  function handleDelete(id) {
    setPatientToDelete(id);
    setOpenDeleteDialog(true);
  }

  async function confirmDelete() {
    try {
      await deletePaciente(patientToDelete);

      setpacientes((pacientesAntigos) =>
        pacientesAntigos.filter((paciente) => paciente.id !== patientToDelete),
      );
      setSnackbarMessage("Paciente deletado com sucesso");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao excluir paciente:", error);
      alert("Não foi possível excluir o paciente.");
    } finally {
      setOpenDeleteDialog(false);
      setPatientToDelete(null);
    }
  }

  const totalPacientes = pacientes.length;

  const totalMedicamentos = estoque.length;

  const alertasCriticos = estoque.filter(
    (item) => Number(item.quantidade) <= 3,
  ).length;

  const [IsOpenModal, setIsOpenModal] = useState(false);

  async function onPatientCreated() {
    try {
      const resposta = await getPacientes();
      if (resposta.success) {
        setpacientes(resposta.data);
        setSnackbarMessage("Novo Paciente cadastrado");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("erro ao recarregar a lista após cadastro", error);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsOpenModal(true)}
          sx={{
            bgcolor: "#007BFF",
            color: "#FFF",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
            borderRadius: "8px",
            px: 3,
            "&:hover": { bgcolor: "#0069D9", boxShadow: "none" },
          }}
        >
          Novo Paciente
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 3,
        }}
      >
        <DashboardCard title="Pacientes" value={totalPacientes} />
        <DashboardCard title="Medicamentos" value={totalMedicamentos} />
        <DashboardCard title="Alertas Críticos" value={alertasCriticos} />
      </Box>

      <Box sx={{ mt: "40px" }}>
        <PatientTable pacientes={pacientes} onDelete={handleDelete} />
      </Box>

      <PatientModal
        open={IsOpenModal}
        onClose={() => setIsOpenModal(false)}
        onPatientCreated={onPatientCreated}
      />

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: "12px" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            bgcolor: "#F7F7F7",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #E5E7EB",
            m: 0,
            p: "16px 24px",
          }}
        >
          <Box sx={{ fontWeight: "bold", color: "#111827", fontSize: "18px" }}>
            Excluir Paciente
          </Box>

          <IconButton
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              bgcolor: "#FEE2E2",
              color: "#EF4444",
              width: 28,
              height: 28,
              "&:hover": { bgcolor: "#FECACA" },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "32px",
            pb: "24px",
          }}
        >
          <IconButton
            disableRipple
            sx={{
              bgcolor: "#FEE2E2",
              color: "#4B5563",
              width: 56,
              height: 56,
              mb: "20px",
              mt: "20px",
              cursor: "default",
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ width: 28, height: 28 }} />
          </IconButton>

          <DialogContentText
            sx={{ textAlign: "center", fontSize: "14px", color: "#6B7280" }}
          >
            Tem certeza que deseja excluir este paciente? Esta ação não poderá
            ser desfeita.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "0 24px 24px 24px", gap: "12px" }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{
              flex: 1,
              color: "#4B5563",
              textTransform: "none",
              fontWeight: 500,
              height: "40px",
              "&:hover": { bgcolor: "transparent", color: "#111827" },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              flex: 1,
              textTransform: "none",
              bgcolor: "#EF4444",
              borderRadius: "8px",
              fontWeight: 600,
              height: "40px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#DC2626", boxShadow: "none" },
            }}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        variant="success"
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert severity="success" sx={{ width: "100%", boxShadow: 3 }}>
          <p>{snackbarMessage}</p>
        </Alert>
      </Snackbar>
    </>
  );
}
