import {api} from "./api";

export const authService = {
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
