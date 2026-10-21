import { api } from "./api";

function criarPayloadPaciente(dadosPaciente) {
  const dataNascimento = dadosPaciente.data_nascimento;
  const dataParseada =
    typeof dataNascimento === "string"
      ? new Date(`${dataNascimento}T00:00:00.000Z`)
      : null;
  const dataValida =
    typeof dataNascimento === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(dataNascimento) &&
    !Number.isNaN(dataParseada.getTime()) &&
    dataParseada.toISOString().slice(0, 10) === dataNascimento;

  if (!dataValida) {
    throw new Error("A data de nascimento deve estar no formato YYYY-MM-DD.");
  }

  return {
    nome_completo: dadosPaciente.nome_completo,
    cpf: dadosPaciente.cpf ?? null,
    data_nascimento: dataNascimento,
    observacoes_medicas: dadosPaciente.observacoes_medicas ?? null,
  };
}

export async function getPacientes() {
  const response = await api.get("/pacientes");
  return response.data;
}

export async function createPaciente(dadosPaciente) {
  const response = await api.post(
    "/pacientes",
    criarPayloadPaciente(dadosPaciente),
  );

  return response.data;
}

export async function updatePaciente(id, dadosPaciente) {
  const response = await api.put(`/pacientes/${id}`, dadosPaciente);

  return response.data;
}

export async function deletePaciente(id) {
  const response = await api.patch(`/pacientes/${id}`, {
    acao: "desativar",
    motivo: "Desativação solicitada via painel do usuário",
  });
  
  return response.data;
}
