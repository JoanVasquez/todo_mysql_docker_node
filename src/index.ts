import app from "./app";
import sequelize from "./config/database.config";
import ip from "ip";
import logger from "./utils/logger";

app.set("PORT", process.env.PORT || 5000);

const { NODE_ENV } = process.env;

async function start() {
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
      logger.error(`DATABASE CONNECTION ERROR: ${err.message}`);
    });
}

start().then(() => {
  app.listen(app.get("PORT"), () =>
    logger.info(`SERVER RUNNING ON: ${ip.address()}:${app.get("PORT")}`)
  );
});
