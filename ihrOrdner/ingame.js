var anzahlDosen = 6;
var leben = 4;
var aufgabenRichtig = 0;
var amWarten = false;

$(function(){

	setUpDosenstand();
});

function setUpDosenstand()
{
	$("body").css(
	{
		"backgroundImage" : "url('bilder/Dosenstand.png')",
		"background-repeat" : "no-repeat",
		"margin" : "4px 0 0 0"
	});

	for(var i = 1; i<anzahlDosen+1; i++)
	{
		$("body").append("<div class='dose" + i + "'></div>");

		$((".dose" + i)).css(
			{
				"backgroundImage" : "url('bilder/JahrmarkDose_" + ((i%4)+1) + ".png')",
				"background-repeat" : "no-repeat",
				"background-size" : "150px, 345px",
				"display" : "flex",
				"z-index" : "10",
				"height" : "65px",
				"width" : "150px",
				"position" : "absolute",
				"align-items" : "center",
				"justify-content" : "center"
			});
	}

	for(var i = 1; i<anzahlDosen+1; i++)
	{
		if(i == 1)
			$(".dose1").css({"top" : "100px", "left" : "550px"});
		if(i == 2 | i == 3)
			$(".dose" + i).css({"top" : "225px", "left" : (450 + 200*(i-2)) + "px"});
		if(i > 3)
			$(".dose" + i).css({"top" : "350px", "left" : (350 + 200*(i-4)) + "px"});


		$(".dose"+i).click(function(){

			if(!amWarten)
			{
				amWarten = true;
				leben--;
				if(parseInt($(this).text()) == lösung)
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtig++;

					//Anstatt dem Fadeout kommt hier die wurf animation
					//bei der die Flügel oben bleiben
					$(this).fadeOut("2000", function(){
						if(leben>0 && aufgabenRichtig < 3)
							window.setTimeout(aufgabeErzeugen, 1000);
					});
				}
				else {
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " + " +
					zahl2 + " = " + lösung);

					//Hier Fehlt noch die Wurfanimation in der die Dose sammt
					//Flügel fällt

					$(this).fadeOut("2000", function(){
						if(leben>0 && aufgabenRichtig < 3)
							window.setTimeout(aufgabeErzeugen, 1000);
					});
				}

				if(aufgabenRichtig > 2)
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
				else if (leben < 1) {
					$(".aufgabe").text("Du hast alle Bälle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtig + " Aufgaben Richtig!");
				}
			}

		});
	}

	for(var i = 1; i<anzahlDosen+1; i++)
	{
		$(".dose" + i).text(zufallsZahlen(1, 76));
	}



	$("body").append("<div class='aufgabe'></div>")
	$(".aufgabe").css(
	{
		"display" : "flex",
		"justify-content" : "center",
		"font-size" : "25pt"
	});

	aufgabeErzeugen();



}


function zufallsZahlen(min, max)
{
	return parseInt((Math.random()*(max-min))+min);
}

function aufgabeErzeugen()
{

	do {
		lösungsDose = ".dose" + parseInt(Math.random()*anzahlDosen+1);
	} while ($(lösungsDose).css("display")=="none");

	lösung = parseInt($(lösungsDose).text());
	zahl1 = zufallsZahlen(1, lösung);
	zahl2 = lösung - zahl1;
	$(".aufgabe").text("Was ergibt " + zahl1 + " + " + zahl2 + "?");

	amWarten = false;
}
