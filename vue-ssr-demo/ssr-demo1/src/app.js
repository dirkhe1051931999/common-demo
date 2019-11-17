var Vue = require("vue");
module.exports = function(ctx) {
  return new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>访问的url是{{url}}</div>`
  });
};
