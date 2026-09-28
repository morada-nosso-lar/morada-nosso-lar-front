import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatientModalSchema } from "./schema";
import { maskCPF, maskPhone } from "../../utils/masks";
import { createPaciente } from "../../services/pacientes";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function PatientModal({ open, onClose, onPatientCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
      reset();
    } catch (error) {
      console.error(error);
    }

  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
            Novo Paciente
          </Box>

          <IconButton
            onClick={handleClose}
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
                placeholder="José da Silva"
                size="small"
                error={!!errors.nome}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" }, // Borda mais suave
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                }}
                {...register("nome")}
              />

              {errors?.nome && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.nome.message}
                </FormHelperText>
              )}
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
                type="number"
                error={!!errors.idade}
                size="small"
                fullWidth
                placeholder="75"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                }}
                {...register("idade")}
              />

              {errors?.idade && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.idade.message}
                </FormHelperText>
              )}
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
                size="small"
                fullWidth
                placeholder="123.456.789-00"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                }}
                onInput={(e) => (e.target.value = maskCPF(e.target.value))}
                {...register("cpf")}
              />

              {errors?.cpf && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.cpf.message}
                </FormHelperText>
              )}
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
                size="small"
                fullWidth
                placeholder="(11) 98765-4321"
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                  "&:hover fieldset": { borderColor: "#D1D5DB" },
                }}
                {...register("telefone")}
                onInput={(e) => (e.target.value = maskPhone(e.target.value))}
              />
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px", gap: "12px" }}>
          <Button
            variant="text"
            onClick={handleClose}
            sx={{
              flex: 1,
              textTransform: "none",
              color: "#4B5563",
              fontWeight: 500,
              mt: "10px",
              mb: "10px",
              height: "35px",
              "&:hover": { bgcolor: "transparent", color: "red" },
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
              bgcolor: "#007BFF",
              fontWeight: 600,
              mt: "10px",
              mb: "10px",
              height: "35px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0069D9", boxShadow: "none" },
            }}
          >
            Cadastrar
          </Button>
        </DialogActions>
      </form>

   
    </Dialog>
  );
}
