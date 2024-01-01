import { createApp } from "./app";
import { env } from "./plugins/envalid/envalid.plugin";

const app = createApp();
const start = async () => {
  try {
    console.log(`server listening on ${env.PORT}`)
    await app.listen({ host: "0.0.0.0", port: env.PORT });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
