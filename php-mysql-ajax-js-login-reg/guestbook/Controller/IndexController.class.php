<?php

class IndexController extends Controller {
	/**
	 * @ 用户名验证 传返回值。
	 * return 0: 表示在数据库没有查到有相同用户名
	 * return 1: 用户名的长度和类型不合法
	 * return 2: 表示在数据库查到了相同用户名
	 * $rs存在:  表示表示用查到了相同的用户名，return 2；
	 */
	private function _verifyUserName($username) {
		if (strlen($username) < 3 || strlen($username) > 10) {return 1;}
		//查数据库里面的数据
		$rs = $this->db->select("SELECT `username` FROM `users` WHERE `username`='{$username}' LIMIT 1");
		if ($rs) {return 2;}else{return 0;}
		
	}
	/**
	 * @ interface 用户名验证
	 * 前台传来的get参数，选择执行IndexController下来action
	 */
	public function verifyUserName() {
		
		$username = $_REQUEST['username'];
		$code  = $this->_verifyUserName($username);
		switch ($code) {
			case 0:
				$this->send(array('code'=>0,'message'=>'恭喜你，该用户名可以注册！'));
				break;
			case 1:
				$this->send(array('code'=>1,'message'=>'用户名长度不能小于4个或大于10个字符！'));
				break;
			case 2:
				$this->send(array('code'=>2,'message'=>'对不起，该用户名已经被注册了！'));
				break;
			default:
				break;
		}
		
	}

	/**
	 * @ interface 用户注册
	 * $username 是帐号
	 * $password 是密码
	 * $code  是检测的返回值 1长度太短 2帐号已注册 0正确
	 * 
	 */
	public function reg() {
		$username = $_REQUEST['username'];
		$password = $_REQUEST['password'];
		$code = $this->_verifyUserName($username);
		//if($code ==0){$this->sendByAjax(array('code'=>1,'message'=>""))}
		if ($code !== 0 || strlen($password)<3 || strlen($password) > 20) {
			$this->send(array('code'=>1,'message'=>'注册失败！'));
		}
		//密码加密，插入数据库里面
		$password = md5($password);
		if (false === $this->db->query("insert into users (username, password) values ('{$username}', '{$password}')")) {
			$this->send(array('code'=>1,'message'=>'注册失败！'));
		}else {
			$this->send(array('message'=>'注册成功！'));
		}
	}


	/**
	 * @ 用户登陆
	 * $username 是帐号
	 * $password 是密码
	 * $rs 在数据库中选出所有用户名等于$username的所有信息，mysql_fetch-array($sql,1);放在$rs数组里面
	 * setcookie(cookiename,cookie的值,cookie的有效期，cookie的服务器路径)
	 */
	public function login() {
		$username = $_REQUEST['username'];
		$password = $_REQUEST['password'];
		//检测cookie中有没有uid，有则证明已经登录过了。
		if (isset($_COOKIE['uid'])) {
			$this->send(array('code'=>1,'message'=>'你已经登陆过了！'));
		}
		$rs= $this->db->select("select * from users where username='{$username}' limit 1");
		if ($rs) {
			if ($rs['password'] != md5($password)) {
				$this->send(array('code'=>1,'message'=>'密码与帐号不匹配'));
			} else {
				//1分钟过期
				setcookie('uid', $rs['uid'], time() + 60, '/');
				setcookie('username', $rs['username'], time() + 60, '/');
				$this->send(array('code'=>0,'message'=>'登陆成功！cookie有效时间为1min'));
			}
		} else {
			$this->send(array('code'=>1,'message'=>'数据库未检测到您的信息'));
		}
	}

	/**
	 * @ 用户退出
	 * 通过把失效日期设置为过去的日期/时间，删除一个 cookie
	 * uid不存在的话，则证明就没有登录
	 */
	public function logout() {
		if (!isset($_COOKIE['uid'])) {
			$this->send(array('code'=>1,'message'=>'你还没有登陆！'));
		} else {
			//通过把失效日期设置为过去的日期/时间，删除一个 cookie：
			setcookie('uid', "", time() - 60, '/');
			$this->send(array('code'=>0,'message'=>'退出成功！'));
		}
	}
}