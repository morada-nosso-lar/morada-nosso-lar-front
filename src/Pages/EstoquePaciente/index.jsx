import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientProfileCard from "../../Components/PatientProfileCard/PatientProfileCard";
import ItemTable from "../../Components/itemTable/itemTable";
import ItemModal from "../../Components/itemModal/itemModal";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  getEstoque,
  createProduto,
  deleteProduto,
  updateProduto,
} from "../../services/estoque";
import { getPacientes } from "../../services/pacientes"; 

export default function EstoquePaciente() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Carrega os dados do paciente e a lista global de produtos
  useEffect(() => {
    async function carregarDados() {
      setLoading(true);

      // 1. Busca do Paciente (Isolada num try/catch próprio)
      try {
        const respostaPacientes = await getPacientes();
        
        // Isola o tratamento do array aqui para não quebrar o Dashboard global
        const listaPacientes = Array.isArray(respostaPacientes) 
          ? respostaPacientes 
          : respostaPacientes?.data || [];

        const pacienteAtual = listaPacientes.find(
          (p) => String(p.id) === String(id)
        );

        if (pacienteAtual) {
          const nascimento = pacienteAtual.dataNascimento
            ? new Date(pacienteAtual.dataNascimento)
            : null;
          let idade = 0;

          if (nascimento && !Number.isNaN(nascimento.getTime())) {
            const hoje = new Date();
            idade = hoje.getFullYear() - nascimento.getFullYear();
            const mes = hoje.getMonth() - nascimento.getMonth();

            if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
              idade--;
            }
          }

          setPaciente({
            ...pacienteAtual,
            nome: pacienteAtual.nomeCompleto || pacienteAtual.nome,
            idade,
          });
        } else {
          setPaciente({ nome: "Paciente não encontrado", idade: 0 });
        }
      } catch (error) {
        console.error(
          "Erro ao carregar paciente. A carregar dados provisórios...",
          error
        );
        setPaciente({ nome: "Paciente Provisório", idade: 0 }); 
      }

      // 2. Busca do Estoque Global (Isolada)
      try {
        const respostaEstoque = await getEstoque();

        // Verifica se o serviço já enviou o array ou se ainda está dentro do objeto original
        const listaMedicamentos = Array.isArray(respostaEstoque)
          ? respostaEstoque
          : respostaEstoque?.data || [];

        setMedicamentos(listaMedicamentos);
      } catch (error) {
        console.error("Erro ao carregar dados do estoque:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregarDados();
    }
  }, [id]);

  // Função chamada ao submeter o modal de criação de item/produto
  const handleAddItem = async (novoItemData) => {
    try {
      const response = await createProduto(novoItemData);
      // O back-end retorna o produto criado dentro de response.data
      if (response && response.data) {
        setMedicamentos((prev) => [response.data, ...prev]);
      }
      setSnackbarMessage("Medicamento cadastrado com sucesso");
      setOpenSnackbar(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
    }
  };

  const handleUpdateQuantidade = async (itemAtual, novaQuantidade) => {
    try {
      await updateProduto(itemAtual.id, {
        ...itemAtual,
        quantidade: novaQuantidade,
      });
      setMedicamentos((prev) =>
        prev.map((item) =>
          item.id === itemAtual.id
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar quantidade do produto:", error);
    }
  };

  function handleDeleteItem(itemId) {
    setItemToDelete(itemId);
    setOpenDeleteDialog(true);
  }

  async function confirmDeleteProduto() {
    try {
      await deleteProduto(itemToDelete);
      setMedicamentos((prev) =>
        prev.filter((item) => item.id !== itemToDelete),
      );
      setSnackbarMessage("Medicamento deletado com sucesso");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      alert("Não foi possível excluir o produto.");
    } finally {
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          ml: "10px",
          mr: "10px",
          mt: "5px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/dashboard")}
            sx={{ color: "#6B7280" }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontSize: { xs: "20px", sm: "22px", md: "24px" },
                fontWeight: 600,
                color: "#1C1C1E",
                letterSpacing: "-0.5px",
              }}
            >
              Estoque do paciente
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#8E8E93" }}>
              Gerencie medicamentos e quantidades
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsModalOpen(true)}
          sx={{
            bgcolor: "#007BFF",
            color: "#FFF",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            "&:hover": { bgcolor: "#0069D9", boxShadow: "none" },
          }}
        >
          Adicionar Item
        </Button>
      </Box>

      {/* Cartão de perfil com dados dinâmicos do paciente */}
      <PatientProfileCard
        paciente={paciente}
        medicamentos={medicamentos}
        loading={loading}
      />

      {/* Tabela de itens conectada à API de estoque */}
      <ItemTable
        medicamentos={medicamentos}
        onDelete={handleDeleteItem}
        onUpdateQuantidade={handleUpdateQuantidade}
      />

      <ItemModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemCreated={handleAddItem}
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
            Excluir Medicamento
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
            Tem certeza que deseja excluir este medicamento? Esta ação não
            poderá ser desfeita.
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
            onClick={confirmDeleteProduto}
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