import { FastifyInstance } from "fastify";
import { healthController } from "../controllers/health/health.controller";

const healthRoute = async (app: FastifyInstance) => {
  app.route({
    handler: healthController,
    method: "GET",
    url: "/",
  });
};

export default healthRoute;
