//ajax函数
function ajax(url,method,data,success){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(e){
		xhr = new ActiveXObject("Microsoft.XMHTTP");
	}
	
		url+="?"+data;
	
	xhr.open(method,url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState===4){
			if(xhr.status===200){
				success && success(xhr.responseText);
			}else{
				alert(xhr.status);
			}
		}
	}
	xhr.send()
}

window.onload=function(){
	//dom操作
	var username1 = document.getElementById("username1");
	var verifyUserNameMsg = document.getElementById("verifyUserNameMsg");
	var btnReg = document.getElementById('btnReg');
	var password1 = document.getElementById("password1");
	var username2 = document.getElementById("username2");
	var password2 = document.getElementById("password2");
	var btnLogin = document.getElementById("btnLogin");
	var logout = document.getElementById("logout");
	var user = document.getElementById("user");
	var userinfo = document.getElementById("userinfo");
	//校验帐号
	username1.onblur=function(){
		ajax("guestbook/index.php","get","m=index&a=verifyUserName&username="+this.value,function(data){
			var jsondata = JSON.parse(data)
			verifyUserNameMsg.innerHTML=jsondata.message;
			console.log(JSON.parse(data));
			if(jsondata.code==1 || jsondata.code==2){
				verifyUserNameMsg.style.color="red";
				btnReg.disabled=true;
			}else{
				verifyUserNameMsg.style.color="green";
				btnReg.disabled=false;
			}
		})
	}
	//注册帐号
	 btnReg.onclick=function(){
	 	 ajax("guestbook/index.php","get","m=index&a=reg&username="+username1.value+"&password="+password1.value,function(data){
	 	 	alert("注册成功！跳转页面中...");
	 	 	location.reload();
	 	 })
	 }
	 //登录帐号
	 btnLogin.onclick=function(){
	 	ajax("guestbook/index.php","get","m=index&a=login&username="+username2.value+"&password="+password2.value,function(data){
	 		console.log(data);
	 		var jsondata = JSON.parse(data);
	 		if(jsondata.code===1){
	 			alert(jsondata.message);
	 			
	 		}else{
	 			alert(jsondata.message);
	 			user.style.display="block";
	 			location.reload();
	 			//userinfo.innerHTML=cookiename;
	 		}
	 	})
	 }
	//登录成功后显示 用户名退出栏
	// if(cookiename===undefined){
	if(uid===undefined){
	 	// userinfo.innerHTML="";
	 	user.style.display="none";
	 }
	 if(cookiename){
	 	userinfo.innerHTML=cookiename;
	 }

	  //退出 	 
	 logout.onclick=function(){
	 	console.log(123);
	 	ajax("guestbook/index.php","get","m=index&a=logout",function(data){
	 		var jsondata = JSON.parse(data)
	 		console.log(data);
	 		if(jsondata.code === 0){
	 			alert("退出成功！");
	 			location.reload();
	 		}else{

	 		}
	 	})
	 }
}

//前端获取cookie
function getCookie(cookiename){
	 		var strCookie = document.cookie;
	 		var arrCookie = strCookie.split(";");
	 		 for(var i = 1;i<arrCookie.length;i++){
	 		 	
	 		 	var arr = arrCookie[i].split("=");
	 		 	
	 		 	   if(arr[0]===cookiename){
	 		 	   		return arr[1];
	 		 	   }
	 		 	   
	 		 }
}
	 	var cookiename = getCookie(" username");
		var uid  = getCookie(" uid");
	 	console.log(cookiename);
		console.log(uid);
