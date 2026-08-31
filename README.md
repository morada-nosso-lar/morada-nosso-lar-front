# 🏥 Morada Nosso Lar — Frontend

Interface web do sistema de **gestão de cuidadores e controle de estoque de suprimentos e medicamentos** para a instituição **Morada Nosso Lar**, desenvolvido no âmbito da disciplina **Itinerário Extensionista II**.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [React.js](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Consumo de API:** Axios / TanStack Query / Fetch

---

## 🚀 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* [Node.js](https://nodejs.org/) — versão 18 ou superior
* [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

---

## 💻 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente no seu ambiente de desenvolvimento.

### 1. Clone o repositório

```bash
git clone https://github.com/morada-nosso-lar/morada-nosso-lar-front.git
```

Entre na pasta do projeto:

```bash
cd morada-nosso-lar-front
```

### 2. Instale as dependências

É necessário executar este comando na primeira vez para instalar todos os pacotes e bibliotecas utilizados pelo projeto:

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

Após a instalação das dependências, execute:

```bash
npm run dev
```

A aplicação estará disponível no endereço exibido no terminal, geralmente:

```text
http://localhost:5173
```

---

## 📁 Estrutura de Pastas

A estrutura principal do projeto está organizada da seguinte forma:

```text
src/
├── assets/          # Imagens, ícones e arquivos estáticos globais
├── components/      # Componentes de UI reutilizáveis
├── pages/           # Telas completas da aplicação
├── services/        # Configurações e serviços de conexão com a API
└── routes/          # Definição das rotas da aplicação
```

### 📂 Principais diretórios

| Diretório     | Descrição                                        |
| ------------- | ------------------------------------------------ |
| `assets/`     | Imagens, ícones e outros arquivos estáticos      |
| `components/` | Componentes reutilizáveis da interface           |
| `pages/`      | Páginas e telas da aplicação                     |
| `services/`   | Serviços responsáveis pela comunicação com a API |
| `routes/`     | Configuração das rotas da aplicação              |

---

## 📌 Funcionalidades

O sistema tem como objetivo auxiliar a instituição **Morada Nosso Lar** no gerenciamento de suas atividades, incluindo:

* 👥 Gestão de cuidadores
* 💊 Controle de medicamentos
* 📦 Controle de estoque de suprimentos
* 📊 Visualização de informações do sistema
* 🔐 Autenticação e acesso ao sistema
* 👤 Gerenciamento de perfil
* 🔄 Integração com API backend

---

## 🌐 Arquitetura

A aplicação foi desenvolvida utilizando uma arquitetura baseada em componentes, permitindo a reutilização de elementos da interface e facilitando a manutenção e evolução do projeto.

O frontend é responsável pela interface e interação com o usuário, enquanto os dados são obtidos através da **API backend**, utilizando ferramentas como **Axios, Fetch e TanStack Query**.

```text
┌─────────────────────────┐
│        Usuário           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      React + Vite        │
│      Tailwind CSS        │
└────────────┬────────────┘
             │
             │ HTTP
             ▼
┌─────────────────────────┐
│       API Backend        │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Banco de Dados    │
└─────────────────────────┘
```

---

## 🎓 Projeto Acadêmico

Este projeto foi desenvolvido como parte da disciplina **Itinerário Extensionista II**, com o objetivo de aplicar conhecimentos de desenvolvimento web na criação de uma solução voltada para uma necessidade real da instituição **Morada Nosso Lar**.

---

## 👨‍💻 Desenvolvimento

Projeto desenvolvido utilizando tecnologias modernas do ecossistema **JavaScript/React**, com foco em:

* Componentização
* Reutilização de código
* Consumo de APIs REST
* Gerenciamento de dados assíncronos
* Responsividade
* Organização e manutenção do código
* Experiência do usuário (UX)

---

## 📄 Licença

Este projeto foi desenvolvido para fins **acadêmicos e educacionais**, no âmbito da disciplina Itinerário Extensionista II.
