import { FastifyInstance } from "fastify";
import { SubscribeToWebhookController, listenToWebhookController } from "../controllers/webhook/webhook.controller";

// SubscribeToWebhookController route
const webhookRoute = async (app: FastifyInstance) => {
  app.route({
    handler: SubscribeToWebhookController,
    method: "POST",
    url: "/:org",
  });

  app.route({
    handler: listenToWebhookController,
    method: "POST",
    url: "/",
  });
}

export default webhookRoute;