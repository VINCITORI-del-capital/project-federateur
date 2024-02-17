import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { Server } from "socket.io";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
  }
}

const plugin: FastifyPluginCallback = async (app, options, done) => {
  const io = new Server(app.server); // Pass the Node.js HTTP server instance

  app.decorate('io', io);

  done(); // Call the done callback to indicate that the plugin has finished loading
};

export default fastifyPlugin(plugin);