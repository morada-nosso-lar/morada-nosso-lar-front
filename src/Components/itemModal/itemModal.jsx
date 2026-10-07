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
import { z } from "zod";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ItemModalSchema = z.object({
  nome: z.string().min(1, "O Nome do medicamento é obrigatório"),
  categoria: z.string().min(1, "A Categoria é obrigatória"),
  quantidade: z.coerce
    .number()
    .min(0, "A quantidade não pode ser negativa"),
  descricao: z.string().optional(),
});

export default function ItemModal({ open, onClose, onItemCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ItemModalSchema),
    defaultValues: {
      quantidade: 1,
      descricao: "",
    },
  });

  const onSubmit = (data) => {
    onItemCreated({
      nome: data.nome,
      categoria: data.categoria,
      quantidade: Number(data.quantidade),
      descricao: data.descricao ?? "",
    });
    
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: { borderRadius: "16px", overflow: "hidden" },
        },
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
            Adicionar Medicamento
          </Box>

          <IconButton
            onClick={handleClose}
            type="button"
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
                Nome do medicamento
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: Losartana 50mg"
                size="small"
                error={!!errors.nome}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
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
                Categoria
              </InputLabel>
              <OutlinedInput
                fullWidth
                placeholder="Ex: Cardíaco"
                size="small"
                error={!!errors.categoria}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                }}
                {...register("categoria")}
              />
              {errors?.categoria && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.categoria.message}
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
                Quantidade inicial
              </InputLabel>
              <OutlinedInput
                type="number"
                size="small"
                fullWidth
                placeholder="Ex: 30"
                error={!!errors.quantidade}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                }}
                {...register("quantidade")}
              />
              {errors?.quantidade && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.quantidade.message}
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
                Descrição
              </InputLabel>
              <OutlinedInput
                fullWidth
                multiline
                minRows={2}
                placeholder="Descrição do medicamento ou produto"
                size="small"
                error={!!errors.descricao}
                sx={{
                  borderRadius: "8px",
                  bgcolor: "#F3F4F6",
                  "& fieldset": { borderColor: "#E5E7EB" },
                }}
                {...register("descricao")}
              />
              {errors?.descricao && (
                <FormHelperText error sx={{ marginLeft: "5px" }}>
                  {errors.descricao.message}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px", gap: "12px" }}>
          <Button
            variant="text"
            type="button"
            onClick={handleClose}
            sx={{
              flex: 1,
              textTransform: "none",
              color: "#4B5563",
              fontWeight: 500,
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
              height: "35px",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0069D9", boxShadow: "none" },
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}