import { z } from "zod";

export const PatientModalSchema = z.object({
  nome: z.string().min(1, "O Campo Nome é Obrigatorio"),
  idade: z.coerce
    .number()
    .min(1, "A Idade não pode ser Negativa")
    .max(120, "A Idade deve ser no maximo 120 anos"),
  telefone: z.string().optional().or(z.literal("")),
  cpf: z.string().optional().or(z.literal("")),
});
