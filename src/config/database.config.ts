import { Sequelize } from "sequelize-typescript";
import path from "path";
import logger from "../utils/logger";

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

let sequelize: any = null;

if (
  !dbConfig.host ||
  !dbConfig.database ||
  !dbConfig.username ||
  !dbConfig.password
) {
  if (process.env.NODE_ENV !== "development") {
    logger.error("SET UP THE ENV VARIABLES FOR THE DATABASE CONNECTION!");
    process.exit(1);
  }
  logger.warn("Variables env not found ::: CONNECTING TO IN MEMORY DATABASE");
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
    models: [models],
  });
} else {
  sequelize = new Sequelize({
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
}

sequelize.addModels([models]);

export default sequelize;
