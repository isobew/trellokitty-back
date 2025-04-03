const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definida");
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
