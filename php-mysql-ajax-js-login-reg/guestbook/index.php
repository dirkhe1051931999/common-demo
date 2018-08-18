<?php
/*
  * 入口文件
  * 数据库基本信息 host port username password databases
  * 控制层，get参数选择
  * DB类中加载数据库连接类(DB_Mysql)，给数据库传入数据库基本信息
  * Controller类中初始化code与message，建立send方法，array_merge并json_encode e
  * exit();输出一个消息并且退出当前脚本
  * 加载模型层，以call_user_func方法，把第一个参数作为回调函数，其余参数为回调函数的参数
  * 
  * 
 */
		//数据层
		$config=array(
			'db_host'		=>	'localhost',
			'db_port'		=>	'3306',
			'db_user'		=>	'root',
			'db_password'	=>	'123',
			'db_name'		=>	'talklist',
		);
		//控制层
		define("module_action",$_REQUEST["a"]);
	
		// mysql库的控制层
		class DB{
			public static function factory(){
				global $config;
				//mysql库
				require_once("./libs/Class/DB_Mysql.class.php");
				return DB_Mysql::instance($config);
			}
		}
		class Controller{
			 public $db = null;
			 private $ajaxData=array(
			 	"code"=>0,
			 	"message"=>"",
			 );
			 public function __construct(){
			 	$this->db = DB::factory();
			 }
			 public function send($data=array()){
			 	$showdata = array_merge($this->ajaxData,$data);
			 	echo json_encode($showdata);//转成json responseText
			 	exit();	//输出一个消息并且退出当前脚本
			 }
		}
		//MVC中的模型层
		require_once("./Controller/IndexController.class.php");
		//把第一个参数作为回调函数调用,其余参数是回调函数的参数。
		call_user_func(array(new IndexController,module_action));