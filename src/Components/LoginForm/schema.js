import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O campo de e-mail é obrigatório")
    .email("Por favor, insira um e-mail válido (ex: email@gmail.com)"),
  senha: z
    .string()
    .min(1, "O campo de senha é obrigatório")
    .min(4, "A senha deve ter pelo menos 4 caracteres"),
});