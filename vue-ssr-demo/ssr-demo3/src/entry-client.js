// 创建应用程序，并且将其挂载到DOM中
import { createApp } from "./app";
const { app, router } = createApp();
// 确保服务端渲染时服务端和客户端输出的一致
router.onReady(() => {
  app.$mount("#app");
});
