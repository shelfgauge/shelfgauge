import * as url from "url";
import { Context } from "koa";
import * as Router from "koa-router";

import proxy from "src/server/proxy";
import * as shelfgauge from "src/service/shelfgauge";

export default new Router()
  .get("/:source/:name/suite", async (ctx: Context) => {
    const suites = await shelfgauge.getRepoSuites(
      ctx.params.source,
      ctx.params.name
    );

    const chart = shelfgauge.toChart(suites);
    await ctx.render("chart.svg", chart);
    ctx.type = "svg";
  })
  .post("/:source/:name/suite", proxy);
