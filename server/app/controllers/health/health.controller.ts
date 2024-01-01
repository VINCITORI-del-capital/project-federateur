import { FastifyReply, FastifyRequest } from "fastify";

const healthController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
    const {PORT, HOST} = request.server.getEnv();
  try {
    
    const test = await request.server.octokit.request('GET /repos/{owner}/{repo}/collaborators', {
      owner: 'VINCITORI-del-capital',
      repo: 'project-federateur',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    console.log(test.data)

    // await request.server.octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
    //   owner: 'bilelzr',
    //   repo: 'testProjectOne',
    //   username: 'ayokay123',
    //   permission: 'admin',
    //   headers: {
    //     'X-GitHub-Api-Version': '2022-11-28'
    //   }
    // })

    // console.log(await request.server.octokit.request('GET /repos/{owner}/{repo}/invitations', {
    //   owner: 'bilelzr',
    //   repo: 'testProjectOne',
    //   headers: {
    //     'X-GitHub-Api-Version': '2022-11-28'
    //   }}
    // ))
    

  } catch (error) {
    console.log(error)
  }

  return reply.status(200).send({
    message: "up and running",
    PORT,
    HOST
  });
};

export { healthController };
