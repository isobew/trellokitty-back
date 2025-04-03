require("dotenv").config();
const express = require("express");
const routes = require("./src/routes");
const sequelize = require("./config/database");

const app = express();

app.use(express.json());
app.use(routes);

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Conectado ao banco!");

        await sequelize.sync({ alter: true });
        console.log("Banco sincronizado!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
}

connectDB();

module.exports = { app, sequelize };
