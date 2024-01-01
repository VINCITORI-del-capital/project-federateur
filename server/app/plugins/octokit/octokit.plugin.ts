import { Octokit } from "octokit";
import { env } from "../envalid/envalid.plugin";
import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
const fetch = require("node-fetch");

const octokit = new Octokit({
  auth: env.TOKEN,
  request: { fetch },
});

type IOctokit = typeof octokit;

declare module "fastify" {
  interface FastifyInstance {
    octokit: IOctokit;
  }
}

const plugin: FastifyPluginCallback = async (app) => {
  app.decorate("octokit", octokit);
};

export default fastifyPlugin(plugin);
