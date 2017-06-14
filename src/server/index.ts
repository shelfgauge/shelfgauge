import * as Koa from "koa";
import proxy from "./proxy";

export default new Koa().use(proxy);
