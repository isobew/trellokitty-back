import "dotenv/config";
import express from "express";
import routes from "./src/routes.js";
import sequelize from "./config/database.js";
import testRoutes from "./src/testRoutes.js";

const app = express();
app.use(express.json());
app.use("/authentication", testRoutes);
app.use(routes);

sequelize.authenticate()
    .then(() => console.log("Conectado ao banco!"))
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));

export { app, sequelize };