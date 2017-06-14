import "./config/boot";

import ENV from "config/env";
import server from "src/server";

server.listen(ENV.port, () => {
  console.log(`Started on port ${ENV.port}`);
});
