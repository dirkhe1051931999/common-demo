// renderer.js 代码如下：
const Vue = require("vue");
// 创建渲染器
const renderer = require("vue-server-renderer").createRenderer();
const app = new Vue({
  template: `<div>Hello World</div>`
});
// 输出：<div data-server-rendered="true">Hello World</div>
renderer
  .renderToString(app)
  .then(html => {
    console.log(html); 
  })
  .catch(err => {
    console.log(err);
  });
