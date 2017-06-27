import { Context } from "koa";
import * as Router from "koa-router";

import repo from "./repo";

export default new Router()
  .get("/", (ctx: Context) => ctx.render("index"))
  .get("/chart", (ctx: Context) => ctx.render("chart.svg"))
  .use("/repo", repo.routes(), repo.allowedMethods());
