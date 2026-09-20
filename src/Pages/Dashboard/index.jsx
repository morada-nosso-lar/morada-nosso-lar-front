import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./style.css";
import AddIcon from "@mui/icons-material/Add";
import DashboardCard from "../../Components/DashboardCard/DashboardCard";
import PatientTable from "../../Components/PatientTable/PatientTable";

export default function Dashboard() {
  const mockPacientes = [
    {
      id: 1,
      nome: "Rogerio Ceni",
      idade: 50,
      medicamentos: 4,
      status: "ok",
      alertaMsg: "OK",
    },
    {
      id: 2,
      nome: "João Carlos Ferreira",
      idade: 82,
      medicamentos: 3,
      status: "critico",
      alertaMsg: "1 crítico",
    },
    {
      id: 3,
      nome: "Antônia Rodrigues Lima",
      idade: 75,
      medicamentos: 3,
      status: "critico",
      alertaMsg: "1 crítico",
    },
    {
      id: 4,
      nome: "Francisca Souza Neto",
      idade: 89,
      medicamentos: 2,
      status: "critico",
      alertaMsg: "1 crítico",
    },
    {
      id: 5,
      nome: "Renato Gaucho",
      idade: 50,
      medicamentos: 0,
      status: "ok",
      alertaMsg: "OK",
    },
  ];

  const totalPacientes = mockPacientes.length;
  const totalMedicamentos = mockPacientes.reduce(
    (total, paciente) => total + paciente.medicamentos,
    0,
  );
  const alertasCriticos = mockPacientes.filter(
    (paciente) => paciente.status === "critico",
  ).length;

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
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
        <DashboardCard title="Medicamentos" value={totalMedicamentos} />
        <DashboardCard title="Alertas Críticos" value={alertasCriticos} />
      </Box>

      <Box sx={{ mt: "40px" }}>
        <PatientTable  pacientes = {mockPacientes} />
      </Box>
    </>
  );
}
