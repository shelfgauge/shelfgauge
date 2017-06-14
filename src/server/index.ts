import * as Koa from "koa";

import proxy from "./proxy";
import router from "src/router";

export default new Koa()
  .use(router.routes())
  .use(router.allowedMethods())
  .use(proxy);
