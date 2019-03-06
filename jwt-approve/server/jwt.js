const Koa = require("koa");
// 用户生成token下发给浏览器
const jwt = require("jsonwebtoken");
// util是对nodejs扩展的库
const util = require("util");
// jwt.verify是校验token的合法性 unti.promisify是回调函数参数的函数换成一个返回Promise的函数
const verify = util.promisify(jwt.verify);
// 提供路有权限控制的功能
const koaJwt = require("koa-jwt")
const Router = require("koa-router");
const router = new Router();
const app = new Koa();
async function tokenError(ctx, next) {
  try {
    const token = ctx.header.authorization;
    if (token) {
      try {
        let payload = await verify(token.split(" ")[1], 'key1');
        ctx.user = {
          name: payload.name,
          id: payload.id
        }
      } catch (error) {
        console.log('token verify fail: ', error)
      }
    }
    await next();
  } catch (error) {
    if (error.status === 401) {
      ctx.status = 401;
      ctx.body = {
        success: 1,
        message: "认证失败"
      }
    } else {
      ctx.status = 404;
      ctx.body = {
        success: 1,
        message: "语法错误或路径错误"
      }
    }
  }
}
app.use(tokenError);
app.use(koaJwt({
  secret: "key1"
}).unless({
  path: [/\/getdata/, /\/logout/,/\/login/]
}))
router.get("/login", async (ctx) => {
  const userToken = {
    name: "Jen",
    id: "01"
  }
  const token = jwt.sign(userToken, 'key1', {
    expiresIn: '2h'
  })
  ctx.body = {
    success: 0,
    token: token,
    message: "登录成功"
  }
})
router.get("/logout", async (ctx) => {
  ctx.body = {
    success: 0,
    message: "退出成功"
  }
})
router.get("/getdata", async (ctx) => {
  ctx.body = {
    success: 0,
    message: "getdata的get方式为忽略token判断的路由"
  }
})
router.get("/userInfo", async (ctx) => {
  let token = ctx.header.authorization
  ctx.body = {
    success: 0,
    message:token
  }
})
app.use(router.routes());
app.listen(1111,()=>{
  console.log("listen 1111")
})