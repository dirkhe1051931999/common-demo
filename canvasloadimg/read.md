**canvas实现图片懒加载 && 下滑底部加载**

使用方法：
 
 * 导入zepto
 
 * 引入index.js文件
 * 执行代码<br />
 $(function(){<br />
	 &nbsp; &nbsp; &nbsp; &nbsp;loadCanvas();<br/>
	&nbsp; &nbsp; &nbsp; &nbsp;$(window).scroll(scrollHandler);<br />
	&nbsp; &nbsp; &nbsp; &nbsp;$("#productul").on("touchmove",scrollHandler);<br />
 })