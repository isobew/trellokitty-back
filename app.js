import "dotenv/config";
import express from "express";
import routes from "./src/routes.js";
import sequelize from "./config/database.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

sequelize.authenticate()
    .then(() => {
        console.log("Conectado ao banco!")
        return sequelize.sync({ force: true });
    })
    .then(() => {
        console.log("Banco sincronizado com sucesso!");
    })
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));

export { app, sequelize };