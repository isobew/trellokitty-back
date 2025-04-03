require("dotenv").config();
const express = require("express");
const routes = require("./src/routes");
const sequelize = require("./config/database");

const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco!");

        await sequelize.sync({ alter: true }); 
        console.log("Banco sincronizado!");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1); 
    }
}

startServer();

module.exports = { app, sequelize };
