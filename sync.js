import "dotenv/config";
import sequelize from "./config/database.js";
import "./app.js";

sequelize.authenticate()
  .then(() => {
    console.log("Conectado ao banco");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Banco sincronizado com sucesso!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Erro ao sincronizar com o banco:", error);
    process.exit(1);
  });
