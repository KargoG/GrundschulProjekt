var anzahlDosen = 6; //Anzahl Dosen(Moegliche Antworten) Auf dem Spielfeld (am besten max 6.)
var lebenDosen = 4; //Insgesammte Versuche fuer den Dosenwerfstand
var aufgabenRichtigDosen = 0; // Anzahl richtig geloester Aufgaben
var kleinstesErgebnissDosen = 1; //inbegriffen
var groeßtesErgebnissDosen = 76; //ausgeschlossen
var aufgabenZielDosen = 4; //Maximal erreichbare Punkte (nach so vielen Richtigen antworten endet das Spiel)

function setUpDosenstand()
{
	// Hier wird der Hintergrund eingestellt
	$("body").css({"backgroundImage" : "url('Dosenstand/Dosenstand.png')"});


	// Ab hier werden die Dosen initialisiert
	for(var i = 1; i<anzahlDosen+1; i++)
	{

		$("body").append("<div class='dose' id='"+ i +"'></div>");

		// Hier wird den Dosen unterschiedliche Bilder gegeben
		$((".dose#" + i)).css({"backgroundImage" : "url('Dosenstand/JahrmarkDose_" + ((i%4)+1) + ".png')"});

		// Hier erhalten die Dosen ihre hover Funktion
		$((".dose#" + i)).hover(function(){
			$("body").append("<img src='auswahl/yellowshiningLuftballon.png' class='schimmer'></img>");
			$("img").css({
				"top" : parseInt($(this).css("top")) - 84 + "px",
				"left" : parseInt($(this).css("left")) - 83 + "px",
				"width": "320px",
				"height": "240px"
			});
		}, function(){
			$(".schimmer").remove();
		});


		//hier wird die Position der Dosen in einem Pyramiden-Muster fest gelegt
		if(i == 1)
			$(".dose#1").css({"top" : "100px", "left" : "550px"});
		if(i == 2 | i == 3)
			$(".dose#" + i).css({"top" : "225px", "left" : (450 + 200*(i-2)) + "px"});
		if(i > 3)
			$(".dose#" + i).css({"top" : "350px", "left" : (350 + 200*(i-4)) + "px"});


		// Hier wird der aktuellen Dose ein Wert als moegliches Ergebniss zugewiesen
		do {
			var neueZahl = true;
			$(".dose#" + i).text(zufallsZahlen(kleinstesErgebnissDosen,
				groeßtesErgebnissDosen));
			for(var j = 1; j < i; j++)
			{
				if($(".dose#" + j).text() == $(".dose#" + i).text())
				{
					neueZahl = false;
				}
			}
		} while (!neueZahl);

		// Hier erhalten die Dosen die Moeglichkeit, als Antworten, angeklickt zu werden
		$(".dose#"+i).click(function(){

			if(!amWarten) // Die abfrage sichert, dass waehrend der animation usw. nichts gecklickt werden kann
			{
				amWarten = true;
				lebenDosen--; // Da die Versuche von vornerein fest sind wird bei jedem Klick/ Wurf ein Leben abgezogen

				if(parseInt($(this).text()) == loesung) // Dies ist der Fall der Richtig angeklickten Loesung
				{
					$(".aufgabe").text("Richtig! Das hast du sehr gut gemacht!");
					aufgabenRichtigDosen++; // Die Anzahl richtiger Lösungen wird mit gezählt

					var dose = $(this); // Da $(this) seine Bedeutung innerhalb der Animation wechselt wird es hier gespeichert

					// In dieser Animation fliegt der Ball auf die angeklickte Dose zu
					$("#"+(lebenDosen+1)+".ball").animate({
						top : [$(this).css("top"), "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 +"px"
					},1500,"swing", function(){
						// Das "Richtig" Schild wird angefügt
						$("body").append("<div class='schild s" +lebenDosen + "' id='richtig'></div>");
						$(".s"+lebenDosen).css({"top" : $(this).css("top"), "left" : $(this).css("left")});
						// Hier wird der Fall der Dose animiert
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							$(this).hide();
							// Wenn der Spieler noch leben hat oder noch nicht genug Punkte hat
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000); // Die nächste aufgabe wird erzeugt
						});
						// In dieser Animation wird der Abprall des Balls von der Dose gezeigt
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt($(this).css("left")) - 100 + "px"

						}, 1000);
					});
				}
				else { // Dies ist der Fall der Falsch angeklickten Loesung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " - " +
					zahl2 + " = " + loesung);

					var dose = $(this); // Da $(this) seine Bedeutung innerhalb der Animation wechselt wird es hier gespeichert

					// In dieser Animation fliegt der Ball auf die angeklickte Dose zu
					$("#"+(lebenDosen+1)+".ball").animate({
						top : [$(this).css("top"), "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 +"px"
					},1500,"swing", function(){
						// Das "Falsch" Schild wird angefügt
						$("body").append("<div class='schild s" +lebenDosen + "' id='falsch'></div>");
						$(".s"+lebenDosen).css({"top" : $(this).css("top"), "left" : $(this).css("left")});
						// Hier wird der Fall der Dose animiert
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							$(this).hide();
							// Wenn der Spieler noch leben hat oder noch nicht genug Punkte hat
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000); // Die nächste aufgabe wird erzeugt
						});
						// In dieser Animation wird der Abprall des Balls von der Dose gezeigt
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt($(this).css("left")) - 100 + "px"

						}, 1000);
					});


				}

				if(aufgabenRichtigDosen >= aufgabenZielDosen) // Hier wird nach dem Wurf geprueft ob man die benoetigte anzahl an richtigen Wuerfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeDosenwerfstand, 3000);
				}
				else if (lebenDosen < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Wuerfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Baelle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigDosen + " Aufgaben Richtig!");
					window.setTimeout(removeDosenwerfstand, 3000);
				}
			}

		});
	}

	// In diesem div wird die Aufgabe den Spielern angezeigt
	$("body").append("<div class='aufgabe'></div>")

	// Ab hier werden Baelle initialisiert ----------------------------------------

	for(var i = 1; i < lebenDosen+1; i++)
	{

		// Hier werden die baelle initialisiert
		$("body").append("<div class='ball' id='"+ i +"'></div>");

		// Hier erhalten die Baelle abhaengig von ihrer Nummer ein Bild und eine Position
		$("#"+ i +".ball").css(
		{
			"backgroundImage" : "url('Dosenstand/Jahrmarktball_" + ((i%3)+1) + ".png')",
			"left" : (890 - 40*(i-1)) + "px"
		});

		if(i%2 == 1) // in dieser Abfrage werden alle UNGERADEN baelle angesprochen
		{
			// Hier werden die angesprochenen baelle Optisch nach hinten versetzt um einen 3 Dimensionalen eindruck zu erzeugen
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

function removeDosenwerfstand()
{
  dosenGespielt = true;

	dosenRichtig = aufgabenRichtigDosen; // die Anzahl richtiger Antworten wird gespeichert

	// Hier werden alle Elemente nach ihrer Klasse entfernt
	$(".dose").remove();
	$(".ball").remove();
	$(".aufgabe").remove();
	$(".schild").remove();
	$(".schimmer").remove();

	amWarten = false;

	// Der Auswahl-Bildschirm wird aufgerufen
	setUpAuswahlscreen();
}

/**
* Die Funktion "aufgabeErzeugen" erzeugt eine Aufgabe und gibt diese auf dem
* Bildschirm, fuer die Spieler zu loesen, aus. Dazu wird zunaechst zufaellig eine
* der NOCH NICHT ANGEKLICKTEN zufaellig ausgewaehlt und deren Wert wird als Loesung
* festgelegt. Im Anschluss wird eine zufaellige Zahl zwischen der Loesung und
* 101 (ausgeschlossen) ausgewaehlt. Diese Zahl ist die erste zahl der Aufgabe
* Daraufhin wird die erste Zahl minus die Loesung gerechnet um den Wert der
* zweiten Zahl heraus zu finden.
* Zum Schluss wird die Aufgabe auf dem Bildschirm ausgegeben
*/
function aufgabeErzeugenMinus()
{

	// In dieser Schleife wird zufaellig eine Dose als Loesungsdose gewaehlt.
	// Die Schleife wiederholt sich falls die Dose schon mal angeklickt
	// wurde und ihr "display" auf "none" gesetzt wurde.
	do {
		loesungsDose = ".dose#" + parseInt(Math.random()*anzahlDosen+1);
	} while ($(loesungsDose).css("display")=="none");

	// Hier werden die Loesung und bestandteile der Aufgabe festgelegt
	loesung = parseInt($(loesungsDose).text());
	zahl1 = zufallsZahlen(loesung, 101);
	zahl2 = zahl1 - loesung;

	// Hier wird die Aufgabe ausgegeben
	$(".aufgabe").text("Was ergibt " + zahl1 + " - " + zahl2 + "?");

	// Sobald die aufgabe ausgegeben wurde wird hier festgelegt, dass
	//die Dosen wieder angeklickt werden koennen.
	amWarten = false;
}
