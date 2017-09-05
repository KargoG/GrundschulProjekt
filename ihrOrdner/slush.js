function setUpSlush(){

	$("body").html(
		"<!-- Hier sind die Bilder :) -->\
		\
		<div id='center'>\
			<!--<img src='Slush/slushbecherbackground.png' alt='hintergrund' id='weis'>-->\
			<img src='Slush/slush_sorten.png' alt='eis' id='eis'>\
			<img src='Slush/auswahl_slush.png' alt='becher' id='becher'>\
		</div>\
		<input type='button' value='Füllen :D' id='startAnimation'>	");

	var points = ballonsRichtig + dosenRichtig + entenRichtig; //das ist eine Variable die �bergeben wird
	var animatePoints = "-="+points+"px";
	var counter = 0;
	$("#startAnimation").css({"cursor":"pointer"});
	//$("#startAnimation").click(function(){
		if(counter <6){
			$("#eis").animate({"margin-top": animatePoints},"1000");
			counter++;
		}
	//});
};
