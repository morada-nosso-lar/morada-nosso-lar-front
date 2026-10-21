import { api } from "./api";

export const CATEGORIAS_PRODUTO = [
  "Remédios",
  "Materiais Médicos",
  "Higiene Pessoal",
];

function criarPayloadProduto(dadosProduto) {
  if (!CATEGORIAS_PRODUTO.includes(dadosProduto.categoria)) {
    throw new Error("Selecione uma categoria válida para o produto.");
  }

  const quantidade = Number(dadosProduto.quantidade);
  if (!Number.isFinite(quantidade)) {
    throw new Error("A quantidade do produto deve ser um número válido.");
  }

  return {
    nome: dadosProduto.nome,
    categoria: dadosProduto.categoria,
    quantidade,
    descricao: dadosProduto.descricao ?? "",
    paciente_id:
      dadosProduto.paciente_id != null
        ? Number(dadosProduto.paciente_id)
        : null,
  };
}

export async function getEstoque(pacienteId) {
  const config =
    pacienteId != null ? { params: { paciente_id: pacienteId } } : undefined;
  const response = await api.get("/estoque", config);
  // O primeiro .data é do Axios, o segundo é a propriedade do teu back-end
  return response.data.data; 
}

export async function createProduto(dadosProduto) {
  const response = await api.post("/estoque", criarPayloadProduto(dadosProduto));
  return response.data;
}

export async function updateProduto(id, dadosProduto) {
  const response = await api.put(`/estoque/${id}`, criarPayloadProduto(dadosProduto));
  return response.data;
}

export async function deleteProduto(id) {
  const response = await api.delete(`/estoque/${id}`);
  return response.data;
}