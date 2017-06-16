import * as Koa from "koa";
import * as views from "koa-views";
import * as APP_ROOT from "app-root-path";

import proxy from "./proxy";
import router from "src/router";

export default new Koa()
  .use(views(APP_ROOT + "/src/view"))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy);
