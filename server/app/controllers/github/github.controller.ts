import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "../../plugins/envalid/envalid.plugin";

type ICollaboratorsParams = {
  repo: string;
};

export const collaboratorsController = async (
  request: FastifyRequest<{ Params: ICollaboratorsParams }>,
  reply: FastifyReply
) => {
  try {
    const { octokit } = request.server;
    const { repo } = request.params;

    const collaborators = await octokit.request(
      "GET /repos/{owner}/{repo}/collaborators",
      {
        owner: env.ORG,
        repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return reply.status(200).send(collaborators.data);
  } catch (error) {
    return reply.status(500).send(error);
  }
};

export const repositoriesListController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { octokit } = request.server;

    const repos = await octokit.request("GET /orgs/{org}/repos", {
      org: env.ORG,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return reply.status(200).send(repos.data);
  } catch (error) {
    return reply.status(500).send(error);
  }
};

export const issuesListController = async (
  request: FastifyRequest<{ Params: ICollaboratorsParams }>,
  reply: FastifyReply
) => {
  try {
    const { octokit } = request.server;
    const { repo } = request.params;

    const repos = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: env.ORG,
      repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return reply.status(200).send(repos.data);
  } catch (error) {
    return reply.status(500).send(error);
  }
};

export const getIssuerController = async (
  request: FastifyRequest<{
    Params: ICollaboratorsParams & { issue_number: number };
  }>,
  reply: FastifyReply
) => {
  try {
    const { octokit } = request.server;
    const { repo, issue_number } = request.params;

    const repos = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}",
      {
        owner: env.ORG,
        repo,
        issue_number,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return reply.status(200).send(repos.data);
  } catch (error) {
    return reply.status(500).send(error);
  }
};
