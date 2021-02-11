import { Context } from "./deps.ts";

const NotFound = (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = "Page not found";
};

export default NotFound;
