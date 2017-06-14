import * as url from "url";
import { Context } from "koa";
import * as Router from "koa-router";

import proxy from "src/server/proxy";

export default new Router().post("/:owner/:name/suite", proxy);
