var amWarten = false; //wird genutzt um klicks waehrend animationen abzufangen
var ballonsRichtig = 0;
var dosenRichtig = 0;
var entenRichtig = 0;

var ballonsGespielt = false; // Speichert ob Luftballon-Darts bereits gespielt wurde
var dosenGespielt = false; // Speichert ob Dosenwerfen bereits gespielt wurde
var entenGespielt = false; // Speichert ob Entenfischen bereits gespielt wurde

$(function(){
	setUpStartscreen();
});

function setUpStartscreen()
{
	// Hier wird der Hintergrund eingestellt
	$("body").css({"backgroundImage" : "url('Startseite/Starseite.png')"})
	// Die benötigten Elemente werden angefügt
	$("body").append("<div class='startButton'></div>");
	$("body").append("<div class='creditsButton'></div>");

	// Hier werden Klick Funktionen angelegt
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
	// Hier werden alle Elemente nach ihrer Klasse entfernt
	$(".startButton").remove();
	$(".creditsButton").remove();
	$(".startscreenText").remove()
}

function setUpCredits()
{
	$("body").css({
  	"background": "radial-gradient(circle at top center, #333 20%, #111 100%)",
		"background-repeat": "no-repeat"
	});

	$("body").html(
		"<div id='all'>\
		  <p class='movie'> Der Jahrmarkt</p>\
		  <p class='job'> directed by</p>\
		  <p class='name'> Christian Fedrau</p>\
		  <p class='job'> produced by</p>\
		  <p class='name'> Christian Fedrau<br> Sven Peitzmeier</p>\
		  <p class='job'> story</p>\
		  <p class='name'> Sven Peitzmeier </p>\
		</div>\
		<input type='button' value='exit' id='exit'>"//Hier geht es wieder zurueck
	);

	$("#exit").css({"background":"green"});

	$("#exit").css({"cursor":"pointer"});

	$("#exit").click(function(){
		location.href="index.html";//hier relativ adressierung zur Startseite
	});
}

/**
* Die Funktion "zufallsZahlen" erzeugt einen Zufallswert zwischen 2 uebergebenen
* Zahlen. Die erste Zahl, die den Parameter min betitelt, ist die untere Grenze.
* Diese ist bei der berechnung des Wertes INBEGRIFFEN. Die zweite Zahl,
* die den Parameter max betitelt ist die obere Grenze. Diese ist bei der
* berechnung des Wertes AUSGESCHLOSSEN.
*/
function zufallsZahlen(min, max)
{
	return parseInt((Math.random()*(max-min))+min);
}
