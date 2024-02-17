import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../plugins/envalid/envalid.plugin";

type IWebhookParams = {
  org: string;
};
export const SubscribeToWebhookController = async (
  request: FastifyRequest<{ Params: IWebhookParams}>,
  reply: FastifyReply
) => {
  try {
    const { octokit } = request.server;

    await octokit.request(`POST /orgs/${request.params.org}/hooks'`, {
      org: 'ORG',
      name: 'web',
      active: true,
      events: [
        'issues',
      ],
      config: {
        url: env.WEBHOOK_URL,
        content_type: 'json'
      },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    return reply.status(200).send('Webhook created');
  } catch (error) {
    return reply.status(500).send(error);
  }
};

export const listenToWebhookController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    request.server.io.emit('issues_update', request.body);

    return reply.status(200).send('Webhook received');
  } catch (error) {
    return reply.status(500).send(error);
  }
}