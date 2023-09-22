import { Sequelize } from "sequelize-typescript";
import path from "path";

const models = path.join(__dirname, "../models");

interface IDatabaseConfig {
  host: string;
  database: string;
  username: string;
  password: string;
  port: number;
}

const dbConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  //port: parseInt(process.env.MYSQL_PORT || "3306"),
} as IDatabaseConfig;

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: "mysql",
  logging: false,
  models: [models],
  pool: {
    max: 10,
    min: 0,
    acquire: 12000,
    idle: 1000,
  },
});

sequelize.addModels([models]);

export default sequelize;
