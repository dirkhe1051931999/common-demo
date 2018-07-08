define(function(require){
	// console.log($)
	return action= {
		sanjiliandong:function(){
			new PCAS("P1","C1");
			new PCAS("P2","C2","陕西省");
			new PCAS("P3","C3","陕西省","咸阳市");
			new PCAS("province","city","area","陕西省","西安市","户县");
			new PCAS("province1","city1","area1","陕西省","西安市","户县");
			new PCAS("province2","city2","area2","陕西省","西安市","户县");
			new PCAS("province3","city3","area3");
			new PCAS("province4","city4","area4","陕西省");
			new PCAS("province5","city5","area5","陕西省","宝鸡市");
			new PCAS("province6","city6","area6","陕西省","西安市","户县");
		}
	}
})