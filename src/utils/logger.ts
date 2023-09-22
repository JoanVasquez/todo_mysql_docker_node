import { default as Logger } from "pino";

const logger: any = Logger({
  base: {
    pid: false,
  },
  transport: {
    target: "pino-pretty",
    options: {
      colorized: true,
    },
  },
  timeStamp: () => `,"time": "${new Date().toLocaleDateString()}"`,
});

export default logger;
