
require.config({
	paths:{
		zepto:"./zepto",
        commonObj:"./action",
        PCASClass:"./PCASClass"
	}
})

require(['zepto','commonObj',"PCASClass"],function($,action,PCASClass){
    if ($("select[name='P1']").length>0) {
        // new PCAS("sheng","shi","qu","吉林省","松原市","宁江区")
        action.sanjiliandong();
    }
})