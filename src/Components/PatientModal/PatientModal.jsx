import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatientModalSchema } from "./schema";
import { maskCPF, maskPhone } from "../../utils/masks";
import { createPaciente } from "../../services/pacientes";

export default function PatientModal({ open, onClose, onPatientCreated }) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(PatientModalSchema),
  });

  const onSubmit = async (data) => {
    try {
      const dadosPaciente = {
        nome_completo: data.nome,
        data_nascimento: new Date(new Date().getFullYear() - data.idade, 0, 1)
          .toISOString()
          .split("T")[0],
        observacoes_medicas: null,
      };

      await createPaciente(dadosPaciente);
      onPatientCreated();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { borderRadius: "16px", padding: "12px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{ fontWeight: "bold", color: "#0F172A", fontSize: "20px" }}
        >
          Novo Paciente
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              mt: 1,
            }}
          >
            <Box>
              <InputLabel
                sx={{
                  fontWeight: 500,
                  color: "#0F172A",
                  mb: "6px",
                  fontSize: "14px",
                }}
              >
                Nome completo
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: José da Silva"
                sx={{ borderRadius: "8px" }}
                {...register("nome")}
              />
            </Box>

            <Box>
              <InputLabel
                sx={{
                  fontWeight: 500,
                  color: "#0F172A",
                  mb: "6px",
                  fontSize: "14px",
                }}
              >
                Idade
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: 75"
                sx={{ borderRadius: "8px" }}
                {...register("idade")}
              />
            </Box>
            <Box>
              <InputLabel
                sx={{
                  fontWeight: 500,
                  color: "#0F172A",
                  mb: "6px",
                  fontSize: "14px",
                }}
              >
                CPF
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: 000.000.000-21"
                sx={{ borderRadius: "8px" }}
                onInput={(e) => (e.target.value = maskCPF(e.target.value))}
              />
            </Box>
            <Box>
              <InputLabel
                sx={{
                  fontWeight: 500,
                  color: "#0F172A",
                  mb: "6px",
                  fontSize: "14px",
                }}
              >
                Telefone
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: (11) 91353-1152"
                sx={{ borderRadius: "8px" }}
                {...register("telefone")}
                onInput={(e) => (e.target.value = maskPhone(e.target.value))}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "0 24px 16px 24px", gap: "12px" }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              flex: 1,
              textTransform: "none",
              borderRadius: "8px",
              color: "#64748B",
              borderColor: "#CBD5E1",
              fontWeight: 600,
              height: "44px",
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              flex: 1,
              textTransform: "none",
              borderRadius: "8px",
              bgcolor: "#16A34A",
              fontWeight: 600,
              height: "44px",
              "&:hover": { bgcolor: "#15803d" },
            }}
          >
            Cadastrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
