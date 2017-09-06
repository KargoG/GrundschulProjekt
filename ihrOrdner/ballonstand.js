var anzahlBallons = 9; //Anzahl Ballons(Moegliche Antworten) Auf dem Spielfeld (am besten max 9.)
var kleinstesErgebnissBallons = 0;  //inbegriffen
var groeßtesErgebnissBallons = 21; //ausgeschlossen
var lebenBallons = 4; //Insgesammte Versuche fuer den Ballon-Darts Stand
var aufgabenRichtigBallons = 0; // Anzahl richtig geloester Aufgaben
var aufgabenZielBallons = 4; //Maximal erreichbare Punkte (nach so vielen Richtigen antworten endet das Spiel)

function setUpBallonwerfen()
{
	// Hier wird der Hintergrund eingestellt
	$("body").css({"backgroundImage" : "url('Dosenstand/Dosenstand.png')"});

	// Ab hier werden die Ballons initialisiert
	for(var i = 1; i<anzahlBallons+1; i++)
	{
		// Hier wird der Ballon an den body angehangen
		$("body").append("<div class='ballons' id='"+ i +"'></div>");

		// Hier wird den Ballons unterschiedliche Bilder gegeben
		$((".ballons#" + i)).css(
		{
			"top" : (100 + 125*(i%3)) + "px",
			"backgroundImage" : "url('Luftballonstand/Luftballon_" + ((i%6)+1) + ".png')"
		});

		// Hier erhalten die Ballons ihre hover Funktion
		$((".ballons#" + i)).hover(function(){
			$("body").append("<img src='auswahl/yellowshining.png' class='schimmer'></img>");
			$("img").css({
				"top" : parseInt($(this).css("top")) - 55 + "px",
				"left" : parseInt($(this).css("left")) - 112 + "px",
				"width": "320px",
				"height": "240px"
			});
		}, function(){
			$(".schimmer").remove();
		});

		// Hier wird die Position der Ballons, abhängig von ihrer Spalte, festgelegt
		if(i < 4)
			$(".ballons#"+i).css({"left" : "350px"});
		if(i > 3 && i < 7)
			$(".ballons#" + i).css({"left" : "550px"});
		if(i > 6)
			$(".ballons#" + i).css({"left" : "750px"});


		// Hier wird der aktuellen Dose ein Wert als moegliches Ergebniss zugewiesen
		do {
			var neueZahl = true;
			$(".ballons#" + i).text(zufallsZahlen(kleinstesErgebnissBallons,
				groeßtesErgebnissBallons));
			for(var j = 1; j < i; j++)
			{
				if($(".ballons#" + j).text() == $(".ballons#" + i).text())
				{
					neueZahl = false;
				}
			}
		} while (!neueZahl);


		// Hier erhalten die Dosen die Moeglichkeit, als Antworten, angeklickt zu werden
		$(".ballons#"+i).click(function(){

			if(!amWarten) // Die abfrage sichert, dass waehrend der animation usw. nichts gecklickt werden kann
			{
				amWarten = true;
				lebenBallons--; // Da die Versuche von vornerein fest sind wird bei jedem Klick/ Wurf ein Leben abgezogen

				if(parseInt($(this).text()) == loesung) // Dies ist der Fall der Richtig angeklickten Loesung
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtigBallons++; // Die Anzahl richtiger Lösungen wird mit gezählt

          var ballon = $(this); // Da $(this) seine Bedeutung innerhalb der Animation wechselt wird es hier gespeichert

					// In dieser Animation fliegt der Pfeil auf den angeklickten Luftballon zu
					$("#"+(lebenBallons+1)+".pfeil").animate({
						top : [parseInt($(this).css("top")) + 50 + "px", "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 + "px"
					},1500,"swing", function(){
						// Das "Richtig" Schild wird angefügt
						$("body").append("<div class='schild s" +lebenBallons + "' id='richtig'></div>");
            $(".s"+lebenBallons).css({"top" : ballon.css("top"), "left" : ballon.css("left")});
						// Hier wird der geplatzte Ballon angezeigt und der Ballon und der Pfeil fadet aus
            ballon.css({"background-image" : "url('Luftballonstand/Luftballon_" +
            ((parseInt(ballon.attr("id"))%6)+1) + "_geplatzt.png'"});
						$(this).fadeOut(1500);
            ballon.fadeOut(1500, function(){
							// Wenn der Spieler noch leben hat oder noch nicht genug Punkte hat
  						if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
              {
  							window.setTimeout(aufgabeErzeugenPlus, 1500); // Die nächste aufgabe wird erzeugt
              }
  					});
					});
        }
				else { // Dies ist der Fall der Falsch angeklickten Loesung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " + " +
					zahl2 + " = " + loesung);

          var ballon = $(this); // Da $(this) seine Bedeutung innerhalb der Animation wechselt wird es hier gespeichert

					// In dieser Animation fliegt der Pfeil auf den angeklickten Luftballon zu
					$("#"+(lebenBallons+1)+".pfeil").animate({
						top : [parseInt($(this).css("top")) + 50 + "px", "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 + "px"
					},1500,"swing", function(){
						// Das "Falsch" Schild wird angefügt
						$("body").append("<div class='schild s" +lebenBallons + "' id='falsch'></div>");
            $(".s"+lebenBallons).css({"top" : ballon.css("top"), "left" : ballon.css("left")});
						// Hier wird der geplatzte Ballon angezeigt und der Ballon und der Pfeil fadet aus
            ballon.css({"background-image" : "url('Luftballonstand/Luftballon_" +
            ((parseInt(ballon.attr("id"))%6)+1) + "_geplatzt.png'"});
            $(this).fadeOut(1500);
            ballon.fadeOut(1500, function(){
							// Wenn der Spieler noch leben hat oder noch nicht genug Punkte hat
              if(lebenBallons>0 && aufgabenRichtigBallons < aufgabenZielBallons)
              {
                window.setTimeout(aufgabeErzeugenPlus, 1500); // Die nächste aufgabe wird erzeugt
              }
  					});
					});


				}

				if(aufgabenRichtigBallons >= aufgabenZielBallons) // Hier wird nach dem Wurf geprueft ob man die benoetigte anzahl an richtigen Wuerfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeBallonwerfen, 3000);
				}
				else if (lebenBallons < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Wuerfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Baelle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigBallons + " Aufgaben Richtig!");
					window.setTimeout(removeBallonwerfen, 3000);
				}
			}

		});
	}

	// In diesem div wird die Aufgabe den Spielern angezeigt
	$("body").append("<div class='aufgabe'></div>")

	// Ab hier werden Pfeile initialisiert

	for(var i = 1; i < lebenBallons+1; i++)
	{

		// Hier werden die Pfeile initialisiert
		$("body").append("<div class='pfeil' id='"+ i +"'></div>");
		// Hier erhalten die Pfeile ihre Position
		$("#"+ i +".pfeil").css({"left" : (890 - 40*(i-1)) + "px"});
	}

	//Hier wird die erste Aufgabe initialisiert
	aufgabeErzeugenPlus();
}


function removeBallonwerfen()
{
  ballonsGespielt = true;

	ballonsRichtig = aufgabenRichtigBallons; // die Anzahl richtiger Antworten wird gespeichert

	// Hier werden alle Elemente nach ihrer Klasse entfernt
	$(".ballons").remove();
	$(".pfeil").remove();
  $(".schild").remove();
	$(".aufgabe").remove();
	$(".schimmer").remove();

	amWarten = false;

	// Der Auswahl-Bildschirm wird aufgerufen
	setUpAuswahlscreen();
}


function aufgabeErzeugenPlus()
{
	// In dieser Schleife wird zufaellig ein Ballon als Loesungsballon gewaehlt.
	// Die Schleife wiederholt sich falls der Ballon schon mal angeklickt
	// wurde und sein "display" auf "none" gesetzt wurde.
	do {
		loesungsBallon = ".ballons#" + parseInt(Math.random()*anzahlBallons+1);
	} while ($(loesungsBallon).css("display")=="none");
	// Die Aufgabe wird dann abhängig von der Lösung berechnet
	loesung = parseInt($(loesungsBallon).text());
	zahl1 = zufallsZahlen(0, loesung);
	zahl2 = loesung - zahl1;

	// Die Aufgabe wird ausgegeben
	$(".aufgabe").text("Was ergibt " + zahl1 + " + " + zahl2 + "?");

	amWarten = false;
}
