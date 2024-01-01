import { FastifyInstance } from "fastify";
import {
  collaboratorsController,
  getIssuerController,
  issuesListController,
  repositoriesListController,
} from "../controllers/github/github.controller";

const githubRoute = async (app: FastifyInstance) => {
  app.route({
    handler: collaboratorsController,
    method: "GET",
    url: "/:repo/collaborators",
  });

  app.route({
    handler: repositoriesListController,
    method: "GET",
    url: "/repositories",
  });

  app.route({
    handler: issuesListController,
    method: "GET",
    url: "/:repo/issues",
  });

  app.route({
    handler: getIssuerController,
    method: "GET",
    url: "/:repo/issues/:issue_number",
  });
};

export default githubRoute;
