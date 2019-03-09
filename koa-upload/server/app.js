const Koa = require("koa");
// 解析成json
const koaJson = require('koa-json');
// 解析body的
const bodyParser = require('koa-bodyparser');
// 静态资源库
const resource = require('koa-static');
// 设置session的
const session = require('koa-session');
const path = require("path");
const app = new Koa();

const Router = require("koa-router");
const upload = require("./upload")
let router = new Router();
// session使用前的一些设置
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'koa:sess', //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
// 上传图片接口
router.post("/upload", async (ctx) => {
  let result;
  try {
    result = await upload.uploadFile(ctx);
    ctx.body = {
      success: 0,
      message: result.filePath
    };
  } catch (error) {
    ctx.body = {
      success: 1,
      message: '缺少参数'
    };
  }

})
// 装载
app.use(bodyParser());
app.use(koaJson());
app.use(resource(path.join(path.normalize(__dirname), 'static')));
app.use(router.routes()).use(router.allowedMethods());
app.listen(1112, () => {
  console.log("listen,1112")
})
