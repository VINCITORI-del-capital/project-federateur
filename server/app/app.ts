import fastify from "fastify";
import cors from "@fastify/cors";

import * as routes from "./routes";
import * as plugins from "./plugins";
import { Server } from "socket.io";

const createApp = () => {
  const app = fastify();

  app.addHook("onRequest", (req, _, done) => {
    req.log.info(
      {
        method: req.raw.method,
        url: req.raw.url,
      },
      "incoming http request"
    );
    done();
  });

  app.addHook("onResponse", (req, reply, done) => {
    req.log.info(
      {
        responseTime: reply.getResponseTime(),
        statusCode: reply.statusCode,
        url: req.raw.url,
      },
      "http request completed"
    );
    done();
  });

  //plugin
  app.register(cors, {
    origin: true,
    credentials: true
  });


  app.register(plugins.socket);
  app.register(plugins.envalid);
  app.register(plugins.octokit);

  //routes
  app.register(routes.health, { prefix: "/" });
  app.register(routes.github, { prefix: "/github" });
  app.register(routes.webhook, { prefix: "/webhook" });

  return app;
};

export { createApp };
