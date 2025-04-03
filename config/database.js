import { Sequelize } from "sequelize";

const isTestEnv = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTestEnv ? "sqlite::memory:" : process.env.DATABASE_URL,
  {
    dialect: isTestEnv ? "sqlite" : "postgres",
    logging: false,
    dialectOptions: isTestEnv ? {} : { ssl: { require: true, rejectUnauthorized: false } }, 
  }
);

export default sequelize;
