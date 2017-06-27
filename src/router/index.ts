import { Context } from "koa";
import * as Router from "koa-router";

import repo from "./repo";

export default new Router()
  .get("/", (ctx: Context) => ctx.render("index"))
  .get("/chart", async (ctx: Context) => {
    await ctx.render("chart.svg", {
      width: 100,
      height: 100,
      lines: [[[20, 100], [40, 60], [70, 80], [100, 20]]]
    });
  })
  .use("/repo", repo.routes(), repo.allowedMethods());
