<?php
header("Content-type: application/json; charset=utf-8");
/**
 * 发送get请求
 * @param string $url 请求地址
 * @param array  $ssl  安全证书
 * @return string
 */
 function http_get($url, $ssl = FALSE)
 {
     $curl = curl_init(); // 启动一个CURL会话
     curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
     if($ssl)
     {
         curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
         curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
         curl_setopt($curl, CURLOPT_SSLVERSION, 3);
     }
     curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
     curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
     curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
     curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
     curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
     $tmpInfo = curl_exec($curl); // 执行操作
     if (curl_errno($curl)) {
         var_dump(curl_error($curl));
         return FALSE;
     }
     curl_close($curl); // 关闭CURL会话
     return $tmpInfo; // 返回数据
 }
 /**
  * 发送post请求
  * @param string $url 请求地址
  * @param array  $data  参数
  * @param array  $ssl  安全证书
  * @return string
*/
function http_post($url, $data, $ssl = FALSE)
{
    $curl = curl_init(); // 启动一个CURL会话
    curl_setopt($curl, CURLOPT_URL, $url); // 要访问的地址
    if($ssl)
    {
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_SSLVERSION, 3);
    }
    curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
    curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
    curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data); // Post提交的数据包
    curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
    curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
    $tmpInfo = curl_exec($curl); // 执行操作
    if (curl_errno($curl)) {
        return FALSE;
    }
    curl_close($curl); // 关闭CURL会话
    return $tmpInfo; // 返回数据
}
// echo http_get("http://joke.zaijiawan.com/Joke/GetComment?appname=readingxiaonimei&os=ios&version=2.11.26&jokeid=2970225&startid=0",true);
$data = array('key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3');
echo http_post("http://api.izhangchu.com/?methodName=HomeIndex&version=4.02",$data,true);
 ?>
