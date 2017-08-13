var anzahlDosen = 6; //Anzahl Dosen Auf dem Spielfeld (am besten max 6.)
var lebenDosen = 4; //Insgesammte Versuche für den Doesenwerfstand
var aufgabenRichtigDosen = 0; // Anzahl richtig gelöster Aufgaben
var amWarten = false; //wird genutzt um klicks während animationen abzufangen
var kleinstesErgebnissDosen = 1; //inbegriffen
var größtesErgebnissDosen = 76; //ausgeschlossen
var aufgabenZielDosen = 3;

var anzahlBälle = 9;
var kleinstesErgebnissBallons = 10;
var größtesErgebnissBallons = 51;
var lebenBallons = 4;
var aufgabenRichtigBallons = 0;
var aufgabenZielBallons = 4;

// Hier Gabs Konfliktlösung

$(function(){
	setUpStartscreen();
});

function setUpStartscreen()
{
	// Das Bild MUSS noch geändert werden -----------------------------------------------
	$("body").css({"backgroundImage" : "url('bilder/Dosenstand.png')"})

	$("body").append("<div class='startscreenText'>Jahrmarkt Spaß</div>")
	$("body").append("<div class='auswahlButtons' id='spielStarten'>Spiel Starten</div>");
	$("body").append("<div class='auswahlButtons' id='credits'>Credits</div>");

	$(".auswahlButtons#spielStarten").click(function(){

		//setUpBallonwerfen();
		setUpDosenstand();
		removeStartscreen();
	});

	$(".auswahlButtons#credits").click(function(){
		setUpCredits();
		removeStartscreen();
	});
}

function setUpCredits()
{

	// Das zeug muss noch mal geupdated werden mit ordentlichem bild
	$("body").css({
  	"background": "radial-gradient(circle at top center, #333 20%, #111 100%)" //*irgendwas rundes als hintergrund*//
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

function setUpDosenstand()
{

	$("body").css(
	{
		"backgroundImage" : "url('bilder/Dosenstand.png')"
	});


	// Ab hier werden die Dosen initialisiert
	for(var i = 1; i<anzahlDosen+1; i++)
	{

		$("body").append("<div class='dose' id='"+ i +"'></div>");

		// Hier wird den Dosen unterschiedliche Bilder gegeben
		$((".dose#" + i)).css(
		{
			"backgroundImage" : "url('bilder/JahrmarkDose_" + ((i%4)+1) + ".png')"
		});

		//hier wird die Position der Dosen in einem Pyramiden-Muster fest gelegt
		if(i == 1)
			$(".dose#1").css({"top" : "100px", "left" : "550px"});
		if(i == 2 | i == 3)
			$(".dose#" + i).css({"top" : "225px", "left" : (450 + 200*(i-2)) + "px"});
		if(i > 3)
			$(".dose#" + i).css({"top" : "350px", "left" : (350 + 200*(i-4)) + "px"});


		// Hier wird der aktuellen Dose ein Wert als mögliches Ergebniss zugewiesen
		do {
			var neueZahl = true;
			$(".dose#" + i).text(zufallsZahlen(kleinstesErgebnissDosen,
				größtesErgebnissDosen));
			for(var j = 1; j < i; j++)
			{
				if($(".dose#" + j).text() == $(".dose#" + i).text())
				{
					neueZahl = false;
				}
			}
		} while (!neueZahl);

		// Hier erhalten die Dosen die Möglichkeit, als Antworten, angeklickt zu werden
		$(".dose#"+i).click(function(){

			if(!amWarten) // Die abfrage sichert, dass während der animation usw. nichts gecklickt werden kann
			{
				amWarten = true;
				lebenDosen--; // Da die Versuche von vornerein fest sind wird bei jedem Klick/ Wurf ein Leben abgezogen

				if(parseInt($(this).text()) == lösung) // Dies ist der Fall der Richtig angeklickten Lösung
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtigDosen++;

					//Anstatt dem Fadeout kommt hier die wurf animation
					//bei der die Flügel oben bleiben
					$(this).fadeOut("2000", function(){
						if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
							window.setTimeout(aufgabeErzeugenMinus, 1000);
					});
				}
				else { // Dies ist der Fall der Falsch angeklickten Lösung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " - " +
					zahl2 + " = " + lösung);

					//Hier Fehlt noch die Wurfanimation in der die Dose sammt
					//Flügel fällt

					$(this).fadeOut("2000", function(){
						if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
							window.setTimeout(aufgabeErzeugenMinus, 1000);
					});
				}

				if(aufgabenRichtigDosen >= aufgabenZielDosen) // Hier wird nach dem Wurf geprüft ob man die benötigte anzahl an richtigen Würfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeDosenwerfstand, 2000);
				}
				else if (lebenDosen < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Würfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Bälle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigDosen + " Aufgaben Richtig!");
					window.setTimeout(removeDosenwerfstand, 2000);
				}
			}

		});
	}

	// In diesem div wird die Aufgabe den Spielern angezeigt
	$("body").append("<div class='aufgabe'></div>")

	// Ab hier werden Bälle initialisiert ----------------------------------------

	for(var i = 1; i < lebenDosen+1; i++)
	{

		// Hier werden die bälle initialisiert
		$("body").append("<div class='ball' id='"+ i +"'></div>");

		// Hier erhalten die Bälle abhängig von ihrer Nummer ein Bild und eine Position
		$("#"+ i +".ball").css(
		{
			"backgroundImage" : "url('bilder/Jahrmarktball_" + ((i%3)+1) + ".png')",
			"left" : (890 - 40*(i-1)) + "px"
		});

		if(i%2 == 1) // in dieser Abfrage werden alle UNGERADEN bälle angesprochen
		{
			// Hier werden die angesprochenen bälle Optisch nach hinten versetzt um einen 3 Dimensionalen eindruck zu erzeugen
			$("#"+ i +".ball").css(
			{
				"top" : "460px",
				"height" : "60px",
				"width" : "60px",
				"background-size" : "60px, 60px",
				"z-index" : "15"
			});
		}

	}

	//Hier wird die erste Aufgabe initialisiert
	aufgabeErzeugenMinus();

}

function setUpBallonwerfen()
{
	$("body").css(
	{
		// Das Bild muss evtl noch geändert werden für den Stand ----------------------------------------------
		"backgroundImage" : "url('bilder/Dosenstand.png')"
	});


	// Ab hier werden die Ballons initialisiert
	for(var i = 1; i<anzahlBälle+1; i++)
	{

		$("body").append("<div class='ballons' id='"+ i +"'></div>");

		// Hier wird den Ballons unterschiedliche Bilder gegeben
		$((".ballons#" + i)).css(
		{
			"top" : (100 + 125*(i%3)) + "px",
			// Das Dosenbild muss durch Luftballons ersetzt werden!!!-------------------------------------------
			"backgroundImage" : "url('bilder/JahrmarkDose_" + ((i%4)+1) + ".png')"
		});

		//hier wird die Position der Dosen in einem Pyramiden-Muster fest gelegt

		if(i < 4)
			$(".ballons#"+i).css({"left" : "350px"});
		if(i > 3 && i < 7)
			$(".ballons#" + i).css({"left" : "550px"});
		if(i > 6)
			$(".ballons#" + i).css({"left" : "750px"});


		// Hier wird der aktuellen Dose ein Wert als mögliches Ergebniss zugewiesen
		do {
			var neueZahl = true;
			$(".ballons#" + i).text(zufallsZahlen(kleinstesErgebnissBallons,
				größtesErgebnissBallons));
			for(var j = 1; j < i; j++)
			{
				if($(".ballons#" + j).text() == $(".ballons#" + i).text())
				{
					neueZahl = false;
				}
			}
		} while (!neueZahl);


		// Hier erhalten die Dosen die Möglichkeit, als Antworten, angeklickt zu werden
		$(".ballons#"+i).click(function(){

			if(!amWarten) // Die abfrage sichert, dass während der animation usw. nichts gecklickt werden kann
			{
				amWarten = true;
				lebenBallons--; // Da die Versuche von vornerein fest sind wird bei jedem Klick/ Wurf ein Leben abgezogen

				if(parseInt($(this).text()) == lösung) // Dies ist der Fall der Richtig angeklickten Lösung
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtigBallons++;

					//Anstatt dem Fadeout kommt hier die wurf animation
					//bei der die Flügel oben bleiben
					$(this).fadeOut("2000", function(){
						if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
							window.setTimeout(aufgabeErzeugenPlus, 1000);
					});
				}
				else { // Dies ist der Fall der Falsch angeklickten Lösung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " + " +
					zahl2 + " = " + lösung);

					//Hier Fehlt noch die Wurfanimation in der die Dose sammt
					//Flügel fällt

					$(this).fadeOut("2000", function(){
						if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
							window.setTimeout(aufgabeErzeugenPlus, 1000);
					});
				}

				if(aufgabenRichtigBallons >= aufgabenZielBallons) // Hier wird nach dem Wurf geprüft ob man die benötigte anzahl an richtigen Würfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeBallonwerfen, 2000);
				}
				else if (lebenBallons < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Würfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Bälle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigBallons + " Aufgaben Richtig!");
					window.setTimeout(removeBallonwerfen, 2000);
				}
			}

		});
	}

	// In diesem div wird die Aufgabe den Spielern angezeigt
	$("body").append("<div class='aufgabe'></div>")

	// Ab hier werden Bälle initialisiert ----------------------------------------

	for(var i = 1; i < lebenBallons+1; i++)
	{

		// Hier werden die bälle initialisiert
		$("body").append("<div class='ball' id='"+ i +"'></div>");

		// Das hier muss noch durch die Pfeile ersetzt werden (bälle bleiben ERSTMAL)-----------------------------------
		$("#"+ i +".ball").css(
		{
			"backgroundImage" : "url('bilder/Jahrmarktball_" + ((i%3)+1) + ".png')",
			"left" : (890 - 40*(i-1)) + "px"
		});

		if(i%2 == 1) // in dieser Abfrage werden alle UNGERADEN bälle angesprochen
		{
			// Hier werden die angesprochenen bälle Optisch nach hinten versetzt um einen 3 Dimensionalen eindruck zu erzeugen
			$("#"+ i +".ball").css(
			{
				"top" : "460px",
				"height" : "60px",
				"width" : "60px",
				"background-size" : "60px, 60px",
				"z-index" : "15"
			});
		}

	}

	//Hier wird die erste Aufgabe initialisiert
	aufgabeErzeugenPlus();
}

function removeStartscreen()
{
	$(".auswahlButtons").remove();
	$(".startscreenText").remove()
}

function removeDosenwerfstand()
{
	$(".dose").remove();
	$(".ball").remove();
	$(".aufgabe").remove();

	lebenDosen = 4;
	aufgabenRichtigDosen = 0;
	amWarten = false;

	setUpStartscreen(); // Hier muss dann später noch
}

function removeBallonwerfen()
{
	$(".ballons").remove();
	$(".ball").remove(); // ball muss noch durch pfeil ersetzt werden!!!-------------------------------
	$(".aufgabe").remove();

	lebenBallons = 4;
	aufgabenRichtigBallons = 0;
	amWarten = false;

	setUpStartscreen();
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

function aufgabeErzeugenPlus()
{
	do {
		lösungsBallon = ".ballons#" + parseInt(Math.random()*anzahlDosen+1);
	} while ($(lösungsBallon).css("display")=="none");
	lösung = parseInt($(lösungsBallon).text());
	zahl1 = zufallsZahlen(0, lösung);
	zahl2 = lösung - zahl1;

	$(".aufgabe").text("Was ergibt " + zahl1 + " + " + zahl2 + "?");

	amWarten = false;
}

/**
* Die Funktion "aufgabeErzeugen" erzeugt eine Aufgabe und gibt diese auf dem
* Bildschirm, für die Spieler zu lösen, aus. Dazu wird zunächst zufällig eine
* der NOCH NICHT ANGEKLICKTEN zufällig ausgewählt und deren Wert wird als Lösung
* festgelegt. Im Anschluss wird eine zufällige Zahl zwischen der Lösung und
* 101 (ausgeschlossen) ausgewählt. Diese Zahl ist die erste zahl der Aufgabe
* Daraufhin wird die erste Zahl minus die Lösung gerechnet um den Wert der
* zweiten Zahl heraus zu finden.
* Zum Schluss wird die Aufgabe auf dem Bildschirm ausgegeben
*/
function aufgabeErzeugenMinus()
{

	// In dieser Schleife wird zufällig eine Dose als Lösungsdose gewählt.
	// Die Schleife wiederholt sich falls die Dose schon mal angeklickt
	// wurde, ihr "display" auf "none" gesetzt wurde.
	do {
		lösungsDose = ".dose#" + parseInt(Math.random()*anzahlDosen+1);
	} while ($(lösungsDose).css("display")=="none");

	// Hier werden die Lösung und bestandteile der Aufgabe festgelegt
	lösung = parseInt($(lösungsDose).text());
	zahl1 = zufallsZahlen(lösung, 101);
	zahl2 = zahl1 - lösung;

	// Hier wird die Aufgabe ausgegeben
	$(".aufgabe").text("Was ergibt " + zahl1 + " - " + zahl2 + "?");

	// Sobald die aufgabe ausgegeben wurde wird hier festgelegt, dass
	//die Dosen wieder angeklickt werden können.
	amWarten = false;
}
