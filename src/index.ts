import app from "./app";
import sequelize from "./config/database.config";
import ip from "ip";
import logger from "./utils/logger";
import { RedisClientType, createClient } from "redis";

app.set("PORT", process.env.PORT || 5000);

export const DEFAULT_EXPIRATION: number = 300;
export const redisClient: RedisClientType = createClient();
redisClient.connect();

async function start() {
  redisClient.on("error", (err) => {
    console.error(err.message);
    // throw throwError(
    //   httpStatus.INTERNAL_SERVER_ERROR.code,
    //   httpStatus.INTERNAL_SERVER_ERROR.status,
    //   err.message
    // );
  });
  sequelize
    .authenticate()
    .then(async () => {
      logger.info("CONNECTED TO DATABASE");
      try {
        //await sequelize.sync({ force: true });
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
