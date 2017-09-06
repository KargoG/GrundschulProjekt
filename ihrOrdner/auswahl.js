
function setUpAuswahlscreen()
{

	// In diesem Teil werden die Elemente für den Auswahl-Bildschirm erzeugt
	$("body").css({"backgroundImage" : "url('auswahl/auswahl.png')"});
	$("body").append("<div class='dosenwerfstand' id='stand'></div>");
	$("body").append("<div class='luftballonstand' id='stand'></div>");
	$("body").append("<div class='entenfischstand' id='stand'></div>");

	// Ab hier werden click und hover Funktionen aufgesetzt
	if(!dosenGespielt || !ballonsGespielt || !entenGespielt) // hier wird überprüft ob mindestens ein Spiel NICHT gespielt wurde
	{
		if(!dosenGespielt) // Hier wird geguckt ob Dosenwerfen noch NICHT gespielt wurde
		{
			$(".dosenwerfstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
				$("img").css({
					"top" : "130px",
					"left" : "-500px",
					"width": "1200px",
					"height": "750px"
				});
			}, function(){
				$(".schimmer").remove();
			});

			$(".dosenwerfstand").click(function(){
				setUpDosenstand();
				removeAuswahlscreen();
			});
		} else { // Falls Dosenwerfen gespielt wurde wird es ausgegraut
			$(".dosenwerfstand").css({"backgroundImage" : "url('auswahl/Dosenwerfstand_auswahl_black_white.png')"});
		}

		if(!ballonsGespielt) // Hier wird geguckt ob Luftballon-Darts noch NICHT gespielt wurde
		{
			$(".luftballonstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshiningLuftballon.png' class='schimmer'></img>");
				$("img").css({
					"top" : "-200px",
					"width": "1200px",
					"height": "750px"
				});
			}, function(){
				$(".schimmer").remove();
			});

			$(".luftballonstand").click(function(){
				setUpBallonwerfen();
				removeAuswahlscreen();
			});
		} else { //Falls Luftballon-Darts gespielt wurde wird es ausgegraut
			$(".luftballonstand").css({"backgroundImage" : "url('auswahl/auswahl_luftballon_black_white.png')"});
		}

		if(!entenGespielt) // Hier wird geguckt ob Entenfischen noch NICHT gespielt wurde
		{
			$(".entenfischstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
				$("img").css({
					"top" : "130px",
					"right" : "-500px",
					"width": "1200px",
					"height": "750px",
				});
			}, function(){
				$(".schimmer").remove();
			});

			$(".entenfischstand").click(function(){
				setUpEntenstand();
				removeAuswahlscreen();
			});
		} else { //Falls Entenfischen gespielt wurde wird es ausgegraut
			$(".entenfischstand").css({"backgroundImage" : "url('auswahl/entenfischstand_auswahl_black_white.png')"});
		}
	}
	else { // Falls bereits alle Spiele gespielt wurde wird zum Slush-Bildschirm gewechselt und dieser wird entfernt
		setUpSlush();
		removeAuswahlscreen();
	}

}


function removeAuswahlscreen()
{
	// Hier werden alle Elemente nach ihrer Klasse entfernt
	$(".dosenwerfstand").remove();
	$(".luftballonstand").remove();
	$(".entenfischstand").remove();
	$(".schimmer").remove();
}
