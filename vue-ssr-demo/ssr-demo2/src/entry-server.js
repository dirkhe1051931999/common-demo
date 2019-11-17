// 导出函数，并且创建vue实现
import { createApp } from "./app";
export default context => {
  // 异步路由是require动态加载进来的，因此我们这边需要返回一个promise对象。以便服务器能够等待所有的内容在渲染前就已经准备好就绪
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();
    router.push(context.url);
    // 确保服务端渲染时服务端和客户端输出的一致
    router.onReady(() => {
      // 获取目标位置或是当前路由匹配的组件数
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      resolve(app);
    }, reject);
  }).catch(() => {});
};
