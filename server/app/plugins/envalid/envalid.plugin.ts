import * as dotenv from "dotenv";
import { cleanEnv, num, str } from "envalid";
import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

dotenv.config();

const env = cleanEnv(process.env, {
  PORT: num({ devDefault: 3000 }),
  HOST: str({ devDefault: "127.0.0.1" }),
  TOKEN: str()
});

type GetEnv = () => typeof env;

declare module "fastify" {
  interface FastifyInstance {
    getEnv: GetEnv;
  }
}

function getEnv() {
  return env;
}

const plugin: FastifyPluginCallback = async (app) => {
  if (typeof app.getEnv !== "undefined") return;
  app.decorate("getEnv", getEnv);
};

export { env, getEnv };
export default fastifyPlugin(plugin);
