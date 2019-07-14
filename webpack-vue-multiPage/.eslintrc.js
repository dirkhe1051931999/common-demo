module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    sourceMap: "module"
  },
  extends: ["plugin:vue/essential", "standard"],
  rules: {
    // https://eslint.org/docs/rules/
    //引号类型 `` "" ''
    quotes: ["warn", "double"], 
     //语句强制分号结尾
    semi: ["warn", "always"],
    // 要求在参数的 ( 前面有一个空格
    "space-before-function-paren": ["warn", "never"],
    // 文件末尾要加空格
    "eol-last": ["warn", "never"]
  }
};
