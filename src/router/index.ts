import * as Router from "koa-router";

import repo from "./repo";

export default new Router().use("/repo", repo.routes(), repo.allowedMethods());
