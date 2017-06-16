import { Context } from "koa";
import * as Router from "koa-router";

import repo from "./repo";

export default new Router()
  .get("/", (ctx: Context) => ctx.render("index"))
  .use("/repo", repo.routes(), repo.allowedMethods());
