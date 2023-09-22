import { Sequelize } from "sequelize-typescript";
import path from "path";

const models = path.join(__dirname, "./src/models");
let sequelize: any = null;

beforeAll(async () => {
  sequelize = new Sequelize("sqlite::memory:", {
    logging: false,
    models: [models],
  });
  sequelize.addModels([models]);

  await sequelize.sync();
});

afterEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {
  sequelize.close();
});
