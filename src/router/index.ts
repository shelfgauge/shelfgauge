import { Context } from "koa";
import * as Router from "koa-router";

import repo from "./repo";
import { render } from "src/view";

export default new Router()
  .get("/", render("index.html"))
  .use("/repo", repo.routes(), repo.allowedMethods());
