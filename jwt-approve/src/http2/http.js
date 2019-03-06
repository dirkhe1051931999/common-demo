import axios from "axios"
// 这是登录接口
const loginApi = "/api/login";
// 这是获取用户信息接口
const getUserInfoApi = "/api/userInfo";
// 这是过滤后的接口
const getDataApi = "/api/getdata"
// 这是首页
const loginOutApi = "/api/logout"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 20000;
// 手动设置Authorization头
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('HAS_SET_TOKEN');
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 添加一个注射器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
async function myAxios(url = "", params = {}, method = "get") {
  method = method.toLowerCase();
  let paramArr = [];
  for (let [key, value] of Object.entries(params)) {
    paramArr.push(key + '=' + value);
  }
  if (paramArr.length > 0) {
    url += '?' + paramArr.join('&').replace(/#/g, '%23');
  }
  console.log(url)
  return new Promise((resolve, reject) => {
    axios.get(url).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    ).catch(error => {
      reject(error);
    });
  })
}

function login() {
  return myAxios(loginApi, {}, 'get')
}

function getUserInfo() {
  return myAxios(getUserInfoApi, {}, 'get')
}

function getData() {
  return myAxios(getDataApi, {}, 'get')
}

function loginOut() {
  return myAxios(loginOutApi, {}, 'get')
}
export default {
  login,
  getUserInfo,
  getData,
  loginOut,
}
