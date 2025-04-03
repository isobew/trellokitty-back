const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false, 
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar no PostgreSQL:', error);
    }
})();

module.exports = sequelize;


