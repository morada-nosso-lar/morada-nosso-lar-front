import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./style.css";
import AddIcon from "@mui/icons-material/Add";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import PatientTable from "../../Components/PatientTable/PatientTable";
import PatientModal from "../../Components/PatientModal/PatientModal";
// 1. Importa a nova função deletePaciente
import { getPacientes, deletePaciente } from "../../services/pacientes";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pacientes, setpacientes] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await getPacientes();

        if (resposta.success) {
          setpacientes(resposta.data);
        }
      } catch (error) {
        console.error("erro ao carregar dados do paciente", error);
      }
    }

    carregar();
  }, []);

  // 2. Cria a função que lida com o clique de exclusão
  async function handleDelete(id) {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este paciente?");
    
    if (confirmacao) {
      try {
        // Vai ao backend apagar
        await deletePaciente(id);
        
        // Atualiza a lista na tela removendo o paciente excluído (sem dar refresh na página)
        setpacientes((pacientesAntigos) => 
          pacientesAntigos.filter((paciente) => paciente.id !== id)
        );
      } catch (error) {
        console.error("Erro ao excluir paciente:", error);
        alert("Não foi possível excluir o paciente.");
      }
    }
  }

  const totalPacientes = pacientes.length;
  
  // Intocado conforme solicitado
  const totalMedicamentos = pacientes.reduce(
    (total, paciente) => total + paciente.medicamentos,
    0,
  );
  
  const alertasCriticos = pacientes.filter(
    (paciente) => paciente.status === "critico",
  ).length;

  const [IsOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsOpenModal(true)}
          sx={{
            bgcolor: "#16A34A",
            color: "#FFF",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "8px",
            px: 3,
            "&:hover": { bgcolor: "#15803d" },
          }}
        >
          Novo Paciente
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 3 }}>
        <DashboardCard title="Pacientes" value={totalPacientes} />
        <DashboardCard title="Medicamentos" value={0} />
        <DashboardCard title="Alertas Críticos" value={alertasCriticos} />
      </Box>

      <Box sx={{ mt: "40px" }}>
        {/* 3. Aspas removidas: passado diretamente como variável JavaScript */}
        <PatientTable pacientes={pacientes} onDelete={handleDelete} />
      </Box>

      <PatientModal open={IsOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
}