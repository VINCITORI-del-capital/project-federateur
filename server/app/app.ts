import fastify from "fastify";
import * as routes from "./routes";
import * as plugins from "./plugins";

const createApp = () => {
  const app = fastify();

  //plugin
  app.register(plugins.envalid);
  app.register(plugins.octokit)

  //routes
  app.register(routes.health, { prefix: "/" });
  app.register(routes.github, { prefix: "/github" });

  return app;
};

export { createApp };
