
function setUpAuswahlscreen()
{
	$("body").css({"backgroundImage" : "url('auswahl/auswahl.png')"});
	$("body").append("<div class='dosenwerfstand' id='stand'></div>");
	$("body").append("<div class='luftballonstand' id='stand'></div>");
	$("body").append("<div class='entenfischstand' id='stand'></div>");

	if(!dosenGespielt || !ballonsGespielt) //|| !entenGespielt)
	{
		if(!dosenGespielt)
		{
			$(".dosenwerfstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
				$("img").css({
					"width": "500px",
					"height": "350px",
					"top" : "220px"
				});
			}, function(){
				$(".schimmer").remove();
			});

			$(".dosenwerfstand").click(function(){
				setUpDosenstand();
				removeAuswahlscreen();
			});
		}

		if(!ballonsGespielt)
		{
			$(".luftballonstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
				$("img").css({
					"width": "1200px",
					"height": "750px",
				});
			}, function(){
				$(".schimmer").remove();
			});

			$(".luftballonstand").click(function(){
				setUpBallonwerfen();
				removeAuswahlscreen();
			});
		}

		if(!entenGespielt)
		{
			$(".entenfischstand").hover(function(){
				$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
				$("img").css({
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
		}
	}
	else {
		setUpSlush();
		removeAuswahlscreen();
	}

}


function removeAuswahlscreen()
{
	$(".dosenwerfstand").remove();
	$(".luftballonstand").remove();
	$(".entenfischstand").remove();
	$(".schimmer").remove();
}
