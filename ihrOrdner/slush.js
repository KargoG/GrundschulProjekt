var hinzugefuegtePunkte = 0; // Anzahl der bereits abgearbeiteten Punkte
var points = 26; //das ist eine Variable die uebergeben wird
var punktepool = 0; // Gesammtpunktzahl
var animatePoints = 0;

function setUpSlush()
{
	// Hier wird der HTML-Code für das Ende vorbereitet
	$("body").html(
		"<div id='center'>\
			<img src='Slush/slush_sorten.png' alt='eis' id='eis'>\
			<img src='Slush/auswahl_slush.png' alt='becher' id='becher'>\
		</div>\
	");
	// Hier wird der Hintergrund vorbereitet
	$("body").css({"background-image" : "url('slush/auswahl.png')"});
	punktepool = entenRichtig + ballonsRichtig + dosenRichtig; // Hier wird die Gesammtpunktzahl vorbereitet (Max. 12)

	if(punktepool > hinzugefuegtePunkte) // Wenn der Spieler mindestens 1 Punkt hat
	{
		window.setTimeout(slushFuellen, 1000);
	}

}

function slushFuellen()
{
	hinzugefuegtePunkte++;
	animatePoints += points;
	$("#eis").animate({"margin-top": "-"+animatePoints+"px"},1000); // Hier wird der Slush langsam gefüllt
	if(punktepool > hinzugefuegtePunkte) // Wenn noch nicht so viele Punkte zum Slush hinzugefügt wurden wie der Spieler hat
	{
		window.setTimeout(slushFuellen, 1000);
	}
	else // Wenn alle Punkte hinzu gefügt wurden
	{
		window.setTimeout(removeSlush, 3000);
	}
}

function removeSlush()
{
	$("#center").remove();
	setUpCredits();
}
