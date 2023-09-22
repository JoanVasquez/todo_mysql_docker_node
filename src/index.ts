import app from "./app";
import sequelize from "./config/database.config";
import ip from "ip";
import logger from "./utils/logger";
import * as dotenv from "dotenv";

dotenv.config();

app.set("PORT", process.env.PORT || 5000);

async function start() {
  console.log("test");
  sequelize
    .authenticate()
    .then(async () => {
      logger.info("CONNECTED TO DATABASE");

      try {
        await sequelize.sync({ force: true });
      } catch (error: any) {
        logger.error(`DATABASE ERROR: ${error.message}`);
      }
    })
    .catch((err: any) => {
      logger.error(`DATABASE CONNECTION ERRO: ${err.message}`);
    });
}

start().then(() => {
  app.listen(app.get("PORT"), () =>
    logger.info(`SERVER RUNNING ON: ${ip.address()}:${app.get("PORT")}`)
  );
});
