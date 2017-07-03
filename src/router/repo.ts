import * as url from "url";
import { Context } from "koa";
import * as Router from "koa-router";

import proxy from "src/server/proxy";
import * as shelfgauge from "src/service/shelfgauge";
import * as chart from "src/view/chart";

export default new Router()
  .get("/:source/:name/suite", async (ctx: Context) => {
    const suites = await shelfgauge.getRepoSuites(
      ctx.params.source,
      ctx.params.name
    );

    ctx.type = "svg";
    ctx.body = chart.render(shelfgauge.toChart(suites));
  })
  .post("/:source/:name/suite", proxy);
