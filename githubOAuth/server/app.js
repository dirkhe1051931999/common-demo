const Koa = require("koa");
const koaStatic = require("koa-static");
const koaRouter = require("koa-router");
const githubRouter = require("./oauth/index")
const koaBodyparser = require("koa-bodyparser");
const koaJson = require("koa-json");
const app = new Koa();
app.use(koaBodyparser())
app.use(koaStatic(__dirname + "/public"));
app.use(koaJson());
const router = new koaRouter();
router.get("/", async (ctx) => {
  ctx.body = "home"
})
app.use(router.routes(), router.allowedMethods());
app.use(githubRouter.routes(), githubRouter.allowedMethods());
app.listen(1111, () => {
  console.log("listen 1111")
})
