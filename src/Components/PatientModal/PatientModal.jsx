import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function PatientModal({ open, onClose }) {
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
      <DialogTitle sx={{ fontWeight: "bold", color: "#0F172A", fontSize: "20px" }}>
        Novo Paciente
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", mt: 1 }}>
          
          <Box>
            <InputLabel sx={{ fontWeight: 500, color: "#0F172A", mb: "6px", fontSize: "14px" }}>
              Nome completo
            </InputLabel>
            <OutlinedInput 
              fullWidth 
              placeholder="Ex: José da Silva" 
              sx={{ borderRadius: "8px" }} 
            />
          </Box>

          <Box>
            <InputLabel sx={{ fontWeight: 500, color: "#0F172A", mb: "6px", fontSize: "14px" }}>
              Idade
            </InputLabel>
            <OutlinedInput 
              fullWidth 
              placeholder="Ex: 75" 
              sx={{ borderRadius: "8px" }} 
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
    </Dialog>
  );
}