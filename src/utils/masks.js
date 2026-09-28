export const maskCPF = (cpf) => {
  return cpf

    .replace(/\D/g, "") // Remove tudo o que não for número
    .slice(0, 11) // Trava em 11 números
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Adiciona o traço
    .replace(/(-\d{2})\d+?$/, "$1"); // Impede digitar mais do que 11 dígitos
};

export const maskPhone = (phone) => {
  return phone
    .replace(/\D/g, "") // 1. Remove tudo o que não for número
    .slice(0, 11) // 2. Trava a string em exatamente 11 números (2 do DDD + 9 do telemóvel)
    .replace(/(\d{2})(\d)/, "($1) $2") // 3. Adiciona os parênteses e o espaço
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2"); // 4. Adiciona o traço no local correto
};
