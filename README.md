# 🐱 TrelloKitty Back

API RESTful desenvolvida em **Node.js + Express**, utilizando arquitetura serverless com **AWS Lambda**, **Sequelize ORM** e banco de dados **PostgreSQL** hospedado na [Neon](https://neon.tech). Este projeto faz parte do sistema estilo Trello com funcionalidades como autenticação, gerenciamento de tarefas e usuários.

---

## Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize ORM**
- **PostgreSQL (Neon)**
- **AWS Lambda (via Serverless Framework)**
- **JWT (Autenticação)**
- **bcryptjs (Hash de senha)**
- **CORS**
- **dotenv**
- **Jest + Supertest (Testes)**
- **Nodemon (Dev)**
- **Serverless Express Adapter**
- **GitHub Actions (CI/CD para deploy no AWS Lambda)**

---

## Scripts

| Comando       | Descrição                                      |
| ------------- | ---------------------------------------------- |
| `npm run dev` | Inicia o servidor local com Nodemon        |
| `npm run sync`| Executa o script `sync.js` para sincronizar DB |

---

## Estrutura

- `app.js`: ponto de entrada da aplicação Express
- `server.js`: ponto de inicialização para desenvolvimento
- `sync.js`: script para sincronizar Sequelize
- `routes/`: rotas da API
- `controllers/`: lógicas e funções
- `models/`: modelos do Sequelize
- `middlewares/`: autenticação, validações
- `.env`: variáveis

---

## Como rodar localmente

    ```bash
    git clone https://github.com/isobew/trellokitty-back.git
    cd trellokitty-back
    npm install
    cp .env.example .env 
    npm run dev

---
 
## Deploy automatizado

Este projeto utiliza **GitHub Actions** para realizar o deploy automatizado na **AWS Lambda**, utilizando o **Serverless Framework**. A cada push na branch "main", o pipeline executa testes automatizados (em um banco temporário) e realiza o deploy da API.

O arquivo de configuração do workflow se encontra em: **.github/workflows/deploy.yml**


> **Observação:** Embora inicialmente tenha sido usado um banco local, o código atual está adaptado exclusivamente para rodar com o banco remoto Neon e em ambiente de produção na AWS Lambda.
Após ajustes ao longo do desenvolvimento, não há mais suporte configurado para rodar com banco PostgreSQL local.