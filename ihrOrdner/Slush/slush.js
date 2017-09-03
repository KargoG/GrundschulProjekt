$(function(){
	
	var points =51.5; //das ist eine Variable die übergeben wird
	var animatePoints = "-="+points+"px";
	var counter =0;
	$("#startAnimation").css({"cursor":"pointer"});
	$("#startAnimation").click(function(){
		if(counter <6){
			$("#eis").animate({"margin-top": animatePoints},"1000");
			counter++;
		}
	})
});