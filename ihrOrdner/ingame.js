var amWarten = false; //wird genutzt um klicks während animationen abzufangen
var ballonsRichtig = 0;
var dosenRichtig = 0;
var entenRichtig = 0;

var ballonsGespielt = false;
var dosenGespielt = false;
var entenGespielt = false;


// Hier Gabs Konfliktlösung

$(function(){
	setUpStartscreen();
});

function setUpStartscreen()
{
	// Das Bild MUSS noch geändert werden -----------------------------------------------
	$("body").css({"backgroundImage" : "url('Startseite/Starseite.png')"})

	$("body").append("<div class='startButton'></div>");
	$("body").append("<div class='creditsButton'></div>");

	$(".startButton").click(function(){


		setUpAuswahlscreen();
		removeStartscreen();
	});

	$(".creditsButton").click(function(){
		setUpCredits();
		removeStartscreen();
	});
}

function removeStartscreen()
{
	$(".startButton").remove();
	$(".creditsButton").remove();
	$(".startscreenText").remove()
}

function setUpCredits()
{

	// Das zeug muss noch mal geupdated werden mit ordentlichem bild
	$("body").css({
  	"background": "radial-gradient(circle at top center, #333 20%, #111 100%)", //*irgendwas rundes als hintergrund*//
		"background-repeat": "no-repeat"
	});

	$("body").html(
		// Hier sind die Entwickler drin
		"<div id='all'>\
		  <p class='movie'> Der Jahrmarkt</p>\
		  <p class='job'> directed by</p>\
		  <p class='name'> Christian Fedrau</p>\
		  <p class='job'> produced by</p>\
		  <p class='name'> Christian Fedrau<br> Sven Peitzmeier</p>\
		  <p class='job'> story</p>\
		  <p class='name'> Sven Peitzmeier </p>\
		</div>\
		<input type='button' value='exit' id='exit'>"//Hier geht es wieder zurück
	);

	$("#exit").css({"background":"green"});

	$("#exit").css({"cursor":"pointer"});

	$("#exit").click(function(){
		location.href="index.html";//hier relativ adressierung zur Startseite
	});
}

/**
* Die Funktion "zufallsZahlen" erzeugt einen Zufallswert zwischen 2 übergebenen
* Zahlen. Die erste Zahl, die den Parameter min betitelt, ist die untere Grenze.
* Diese ist bei der berechnung des Wertes INBEGRIFFEN. Die zweite Zahl,
* die den Parameter max betitelt ist die obere Grenze. Diese ist bei der
* berechnung des Wertes AUSGESCHLOSSEN.
*/
function zufallsZahlen(min, max)
{
	return parseInt((Math.random()*(max-min))+min);
}
