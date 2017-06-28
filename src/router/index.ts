import { Context } from "koa";
import * as Router from "koa-router";

import repo from "./repo";

interface Coord {
  0: number;
  1: number;
}

interface Chart {
  width: number;
  height: number;
  lines: {
    [color: string]: Coord[];
  };
}

export default new Router()
  .get("/", (ctx: Context) => ctx.render("index"))
  .get("/chart", async (ctx: Context) => {
    const chart: Chart = {
      width: 100,
      height: 100,
      lines: {
        black: [[20, 100], [40, 60], [70, 80], [100, 20]],
        red: [[10, 90], [40, 60], [80, 70], [20, 20]]
      }
    };
    await ctx.render("chart.svg", chart);
    ctx.type = "svg";
  })
  .use("/repo", repo.routes(), repo.allowedMethods());
