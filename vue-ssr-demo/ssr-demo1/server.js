const Vue = require("vue");
const Koa = require("koa");
const Router = require("koa-router");
const renderer = require("vue-server-renderer").createRenderer({
  // 读取传入的template参数
  template: require("fs").readFileSync("./src/index.template.html", "utf-8")
});

// 1. 创建koa koa-router实列
const app = new Koa();
const router = new Router();

// 引入 app.js
const createApp = require("./src/app");

// 2. 路由中间件

router.get("*", async (ctx, next) => {
  // 创建vue实列
  const app = createApp(ctx);

  const context = {
    title: "vue服务器渲染组件",
    meta: `
      <meta charset="utf-8">
      <meta name="" content="vue服务器渲染组件">
    `
  };
  try {
    // 传入context 渲染上下文对象
    const html = await renderer.renderToString(app, context);
    ctx.status = 200;
    ctx.body = html;
  } catch (e) {
    ctx.status = 500;
    ctx.body = "服务器错误";
  }
});

// 加载路由组件
app.use(router.routes()).use(router.allowedMethods());

// 启动服务
app.listen(3001, () => {
  console.log(`server started at localhost:3001`);
});
