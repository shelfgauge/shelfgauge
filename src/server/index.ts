import * as APP_ROOT from "app-root-path";
import * as Koa from "koa";
import * as views from "koa-views";
const error = require("koa-error");

import ENV from "config/env";

import proxy from "./proxy";
import router from "src/router";

export default new Koa()
  .use(error())
  .use(
    views(APP_ROOT + "/src/view", {
      options: { API_URL: ENV.apiUrl },
      map: { html: "lodash", svg: "lodash" }
    })
  )
  .use(router.routes())
  .use(router.allowedMethods());
