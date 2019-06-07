# 编写一个简单的 loader

> 实现功能：读取 txt 文件，使用自定义的 loader，将 txt 文件的内容替换成解析时提供的参数，以变量形式暴露出来

## 步骤

```bash
# loader参数获取包
npm install --save-dev loader-utils
```

```js
// 根目录/test-loader.js;
var utils = require("loader-utils");
module.exports = function(source) {
  const options = utils.getOptions(this);
  source = source.replace("loader", options.loader);
  return `export const test = ${source}`;
};
```

```js
// src/index.js
import { text } from "./text.js";
import test from "./test.txt";
console.log(text);
```

```js
// src/text.js
export const text = "koa";
```

```txt
// src/test.txt
loader
```

```js
// webpack.config.js
const path = require("path");
module.exports = {
  mode: "development",
  entry: ["babel-polyfill", path.join(__dirname, "./src/index.js")],
  output: {
    path: path.join(__dirname, "./bundle"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: path.join(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.txt$/,
        use: {
          loader: path.resolve(__dirname, "./test-loader.js"),
          options: {
            loader: "test-loader"
          }
        }
      }
    ]
  }
};
```
