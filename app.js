import "dotenv/config";
import express from "express";
import routes from "./src/routes/routes.js";
import sequelize from "./config/database.js";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

import "./src/models/Task.js"; 
import "./src/models/User.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

sequelize.authenticate()
    .then(() => {
        console.log("Conectado ao banco!")}
    )
    .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));

export { app, sequelize };