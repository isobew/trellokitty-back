const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: "neondb",
    username: "neondb_owner",
    password: "npg_Nmy3iEBsg9wl",
    host: "ep-curly-glitter-a4k4bhiq-pooler.us-east-1.aws.neon.tech",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });

module.exports = sequelize;
