import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientProfileCard from "../../Components/PatientProfileCard/PatientProfileCard";
import ItemTable from "../../Components/itemTable/itemTable";
import ItemModal from "../../Components/itemModal/itemModal";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Box, Typography, Button } from "@mui/material";
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

  // Função para deletar um item da tabela via API
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteProduto(itemId);
      setMedicamentos((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
      <PatientProfileCard paciente={paciente} loading={loading} />

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
    </>
  );
}