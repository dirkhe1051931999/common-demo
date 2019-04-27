var ajaxState = true,
	pageSize = 5,
	currentpage =1;
//  canvas懒加载
function loadCanvas () {
	var imglength = $("#productul").find("canvas").length;
	if (imglength>0) {
		$("#productul").find("canvas").each(function(){
			var imgSrc=$(this).data("src");
			var imageObj = new Image();
			// 当前获取的canvas
			imageObj.canvs = $(this)[0];
			var cvs = imageObj.canvs.getContext("2d");
			if (cvs) {
				imageObj.onload = function(){
					imageObj.canvs.width = this.width;
					imageObj.canvs.height = this.height;
					cvs.drawImage(this,0,0);
					// 绘制成功后 把loading取消
					$(imageObj.canvs).css("background-image","none");
				}
				imageObj.src=imgSrc;
			}
		})
	}
}
// ajax请求数据(模拟了一个接口)
function getData(pagenumber){
	$.ajax({
		type:"get",
		url:"./test.json",
		data:{
			page:pagenumber,
			row:pageSize,
		},
		dataType:"json",
		success:function(result){
			$(".loaddiv").hide();
			if (result.length>0) {
				// 数据加载成功，设置标志位
				ajaxState=true;
				insertDiv(result);
				loadCanvas();
			}else{
				// 没有数据，不执行，设置标志位
				$("#pagenumberlength").val("0");
			}
		},
		beforeSend:function(){
			$(".loaddiv").show();
		},
		error:function(){
			$(".loaddiv").hide();
		}
	})
}
// dom 插入
function insertDiv(json){
	var $mainDiv = $("#scrollAdd");
	var html = "";
	var showlength =5;
	if (json.length<5) {
		showlength = json.length;
	}
	for(var i=0;i<showlength;i++){
	    html += '<li><a href="#">'+
	        '<div class="leftimage fl"><canvas data-src="./product1.png" ></canvas></div>'+
	         '<div class="productcontent fr">'+
	             '<p class="ptitle ">这是标题</p>'+
	              '<p class="pdes ">简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>'+
	              '<p class="pprice ">这是注释</p>'+
	        '</div></a></li>';
	}
	$mainDiv.append(html);
}
// 据底部60判断
function scrollHandler(){
	// console.log(parseInt(scrollT)+parseInt(winHeight)+50>=parseInt(pageH) && ajaxState)
	
	var pageH = $(document).height();
	// 滚动条的top
	var scrollT = $(window).scrollTop();
	var winHeight = $(window).height();
	if (parseInt(scrollT)+parseInt(winHeight)+60>=parseInt(pageH) && ajaxState){
		if ($("#pagenumlength").val()=="1") {
			// 滚动到底部，设置标志位
			ajaxState =false;
			currentpage++;
			getData(currentpage);
		}else{
			return;
		}
	}
}