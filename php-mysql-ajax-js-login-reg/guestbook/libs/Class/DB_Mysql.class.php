<?php
/*
 *
 * 这是数据库connect、query、select、连接，插入，查询
 * 有一个有趣的地方，就是在调用DB_Mysql::instance($config),实际上就是在new DB_Mysql($config),
 * new DB_Mysql($config) 会把$config保存，还会调用当前类的数据库connect方法
 * 
 */
class DB_Mysql {

	private static $instanceObj;
	private $config ; //盛放的是数据库连接的信息，host port username password databases
	
	private function __construct($config) {
		$this->config = $config;  
		$this->connect();
	}

	public static function instance($config) {
		if (!self::$instanceObj) {
			self::$instanceObj = new DB_Mysql($config);
		}
		return self::$instanceObj;
	}
	//连接数据库
	public function connect() {
		mysql_connect($this->config['db_host'],$this->config['db_user'],$this->config['db_password']);
		mysql_select_db($this->config['db_name']);
		$this->query("set names 'utf8'");
	}
	//执行sql语句
	public function query($sql) {
		return mysql_query($sql);
	}

	public function select($sql) {
		$query = $this->query($sql);
		$rs = array();
		//将查询的结果以数字1的索引方式存在数组里面
		$queryArr = mysql_fetch_array($query, 1);
		 if($queryArr) {
			$rs[] = $queryArr;
		 }
		return isset($rs[0])?$rs[0]:false;
	}
}
