import { z } from "zod";

const CPF_INVALIDO_MESSAGE =
  "CPF inválido. Informe um CPF válido ou deixe o campo em branco.";

function cpfValido(cpf) {
  if (!/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(cpf)) {
    return false;
  }

  const digitos = cpf.replace(/\D/g, "");
  if (/^(\d)\1{10}$/.test(digitos)) {
    return false;
  }

  const calcularDigito = (base, pesoInicial) => {
    const soma = base
      .split("")
      .reduce(
        (total, digito, index) =>
          total + Number(digito) * (pesoInicial - index),
        0,
      );
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const primeiroDigito = calcularDigito(digitos.slice(0, 9), 10);
  const segundoDigito = calcularDigito(digitos.slice(0, 10), 11);

  return (
    Number(digitos[9]) === primeiroDigito &&
    Number(digitos[10]) === segundoDigito
  );
}

export const PatientModalSchema = z.object({
  nome: z.string().min(1, "O Campo Nome é Obrigatorio"),
  idade: z.coerce
    .number()
    .min(1, "A Idade não pode ser Negativa")
    .max(120, "A Idade deve ser no maximo 120 anos"),
  telefone: z.string().optional().or(z.literal("")),
  cpf: z
    .string()
    .nullable()
    .optional()
    .refine((cpf) => cpf === null || cpf === undefined || cpf === "" || cpfValido(cpf), {
      message: CPF_INVALIDO_MESSAGE,
    }),
  observacoes: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Se preenchido, deve ter no mínimo 3 caracteres",
    }),
});
