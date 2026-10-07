import { api } from "./api";

function criarPayloadProduto(dadosProduto) {
  return {
    nome: dadosProduto.nome,
    categoria: dadosProduto.categoria,
    quantidade: dadosProduto.quantidade,
    descricao: dadosProduto.descricao ?? "",
  };
}

export async function getEstoque() {
  const response = await api.get("/estoque");
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