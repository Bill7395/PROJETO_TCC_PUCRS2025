Claro, Gabriel! Aqui está o `README.md` completo para o seu projeto, no estilo documentação técnica — pronto para ser usado no GitHub ou como guia de instalação e execução:

---

# 🛒 Marketplace TCC – PUCRS 2025

Este projeto consiste em uma plataforma de marketplace desenvolvida como trabalho de conclusão de curso, voltada para micro e pequenos empreendedores. O sistema permite a publicação de produtos, gerenciamento de pedidos e vendas online, com integração a uma API de pagamentos (PagBank) e arquitetura containerizada com Docker.

## 📁 Estrutura do Projeto

```
PROJETO_TCC_PUCRS2025/
├── backend/           # API em Node.js (Express + MongoDB)
├── frontend/          # Aplicação em React.js + Tailwind CSS
├── docker-compose.yml # Orquestração dos serviços com Docker
├── .env.example       # Exemplo de variáveis de ambiente
└── README.md          # Este arquivo
```

---

## ⚙️ Tecnologias Utilizadas

| Camada        | Tecnologias                                                |
|---------------|------------------------------------------------------------|
| Frontend      | React.js, Tailwind CSS, React Router, Axios                |
| Backend       | Node.js, Express.js, MongoDB, JWT, CORS, dotenv            |
| Banco de Dados| MongoDB (local via Docker)                                 |
| Pagamentos    | API PagBank (modo Sandbox)                                 |
| Orquestração  | Docker, Docker Compose                                     |
| Deploy        | Preparado para ambiente EC2 (AWS)                          |
| Organização   | Jira Software (Kanban)                                     |

---

## 🚀 Como executar o projeto localmente

### 📦 Pré-requisitos

- Docker
- Docker Compose
- Node.js (para testes manuais, opcional)

### 🔧 Passo a passo

1. **Clone o repositório:**

```bash
git clone https://github.com/Bill7395/PROJETO_TCC_PUCRS2025.git
cd PROJETO_TCC_PUCRS2025
```

2. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` e renomeie para `.env` dentro da pasta `/backend`, preenchendo com:

```env
JWT_SECRET=sua_chave
PAGBANK_TOKEN=sua_chave_sandbox
MONGO_URI=mongodb://mongo:27017/tcc-marketplace
```

3. **Execute o Docker Compose:**

```bash
docker-compose up --build
```

4. **Acesse os sistemas:**

- **Frontend (cliente):** http://localhost:3001  
- **Backend (API):** http://localhost:5000  
- **MongoDB (Docker interno):** porta 27017

---

## 📦 Docker Hub

Imagens publicadas para uso em produção:

- [Frontend (React): gabrielssantos7395/frontend-tcc](https://hub.docker.com/repository/docker/gabrielssantos7395/frontend-tcc/general)  
- [Backend (Node.js): gabrielssantos7395/backend-tcc](https://hub.docker.com/repository/docker/gabrielssantos7395/backend-tcc/general)

---

## 🧪 Testes manuais e validações

- A plataforma foi testada com usuários reais e simulações via Postman.
- A API de pagamentos PagBank foi integrada com cartões de teste (modo sandbox).
- Registros de fluxo no MongoDB foram verificados em ambiente containerizado.
- Todo o processo de execução local foi documentado em [evidências do TCC](#).

---

## 📊 Organização do Projeto

Kanban Jira para acompanhamento de tarefas:

- [Quadro do Projeto – Jira Software](https://gabrielsouzasantos1995.atlassian.net/jira/software/projects/KAN/boards/1)

---

## 📚 Documentação complementar

- **Repositório GitHub:**  
  [https://github.com/Bill7395/PROJETO_TCC_PUCRS2025](https://github.com/Bill7395/PROJETO_TCC_PUCRS2025)

- **Banco de dados MongoDB (estudos e testes):**  
  [MongoDB Atlas Cluster](https://cloud.mongodb.com/v2/66e86651809448346ff2f4d7#/clusters)

- **TCC e documentação acadêmica:**  
  Disponível sob solicitação (PUCRS 2025)

---

## 📌 Funcionalidades do MVP

- Cadastro e login de vendedores e clientes
- Publicação e edição de produtos
- Carrinho de compras
- Integração com API de pagamento (PagBank)
- Painel do vendedor com controle de pedidos
- Rotas protegidas com autenticação JWT
- Responsividade mobile

---

## 💡 Funcionalidades futuras (Roadmap)

- Avaliação de produtos pelos clientes
- Cálculo e integração com serviços logísticos
- Painel analítico de vendas
- Aplicativo mobile com React Native
- Notificações automáticas pós-venda

---

## 👨‍💻 Autor

Gabriel Souza dos Santos  
Desenvolvedor Full Stack | Projeto de Conclusão de Curso – PUCRS 2025

