const fetch = require('node-fetch');
const config = {
  client_id: 'b0fbc6a7d4ff2b320158',
  client_secret: 'a02a9f6bac91f3acee2dc8aae86513bc2a94a6b6'
}
exports.githubOauth = async (ctx) => {
  const code = ctx.query.code;
  let url1 = "https://github.com/login/oauth/access_token";

  const params = {
    client_id: config.client_id,
    client_secret: config.client_secret,
    code: code
  };
  await fetch(url1, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    })
    .then((res) => {
      return res.text();
    })
    .then((body) => {
      const args = body.split("&");
      let arg = args[0].split("=");
      return arg[1]
    })
    .then(async (token) => {
      let url2 = `https://api.github.com/user?access_token=${token}`;
      await fetch(url2)
        .then(res => {
          return res.json()
        })
        .then(res => {
          // 可以做一些数据库相关的操作
          let newGuest = {
            userName: res.login,
            avatar: res.avatar_url,
            email: res.email
          };
          ctx.body = {
            success: 1,
            data: newGuest
          }
        })
    })
    .catch(e => {
      ctx.body = {
        success: 0,
        data: "",
        message: 'GitHub授权登录失败'
      }
    })

}
