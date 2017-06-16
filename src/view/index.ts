import { Context } from "koa";
import * as fs from "fs";
import * as path from "path";

function readFile(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function render(viewName: string) {
  return async (ctx: Context) => {
    ctx.type = "html";
    ctx.body = await readFile(path.join(__dirname, viewName));
  };
}
