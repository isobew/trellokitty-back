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


## Endpoints da API

> Base URL: `https://v6y4qi4paxpzlgdch7f7reekvy0znrph.lambda-url.us-east-1.on.aws`

--- 

### Autenticação

#### POST /register
Cria um novo usuário.

Estrutura do Body
```json
{
"username": "john_doe",
"password": "123456"
}
```
---

### POST /login
Retorna o token JWT.

Estrutura do Body
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
---


## Usuários

### GET /users
Retorna todos os usuários.


---

## Tarefas

### GET /tasks
Lista todas as tarefas.

### POST /create-task
Cria uma nova tarefa.

Estrutura do Body
```json
{
  "title": "Nova tarefa",
  "description": "Descrição",
  "category": "trabalho"
}
```
> Observação: A coluna de "status" é definida automaticamente como "pendente" na criação e a de "userId" é definida como o id do usuário que a criou.

### PUT /update-task/:id
Atualiza uma tarefa existente.
```json
{
  "title": "Nova tarefa",
  "description": "Descrição",
  "category": "trabalho",
  "status": "em andamento",
  "userId": "id-do-usuário"
}
```
> Observação: Na estrutura do front-end, o campo status não é atualizado manualmente por este endpoint. A mudança de status ocorre exclusivamente via interação de drag and drop no quadro.

### DELETE /tasks/:id
Remove uma tarefa.


---

## Documentação da API (Swagger)
A documentação completa dos endpoints da API está disponível via Swagger.

🔗 Acesse aqui a documentação Swagger:
 - https://v6y4qi4paxpzlgdch7f7reekvy0znrph.lambda-url.us-east-1.on.aws/api-docs/

> Obs: Certifique-se de clicar em "Authorize" e informar seu token JWT para testar endpoints protegidos