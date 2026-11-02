import { api } from "./api";

export const logsService = {
  async listar() {
    const response = await api.get("/estoque/logs");
    return response.data;
  },
};
