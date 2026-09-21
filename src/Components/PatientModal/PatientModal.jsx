import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Button";

export default function PatientModal({open, onClose}) {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <DialogTitle>Novo Paciente</DialogTitle>

      <DialogContent>
        <Box sx={{ gap: "10px" }}>
          <InputLabel>Nome do Paciente</InputLabel>
          <OutlinedInput placeholder="João Silva" />

          <InputLabel>Idade</InputLabel>
          <OutlinedInput placeholder="75" />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="text" onClick={onClose}>Cancelar</Button>
        <Button >Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
