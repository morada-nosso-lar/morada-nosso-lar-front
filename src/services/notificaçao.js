import { api } from "./api";

// Service Pattern:

export const notificacaoService = {
  // Objeto JavaScripit que agrupa um conjuntos de metodos(Função) relacionado com o mesmo assunto
  async listar(params = {}) {
    const response = await api.get("/notificacoes", { params });
    return response.data;
  },

  async marcarComoLida(id, lida) {
    const response = await api.patch(`/notificacoes/${id}`, { lida });
    return response.data;
  },

  // Função escrita de forma mais moderna

  excluir: async (id) => {
    const response = await api.delete(`/notificacoes/${id}`);
    return response.data;
  },
};
