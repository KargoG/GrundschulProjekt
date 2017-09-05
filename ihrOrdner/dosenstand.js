
var anzahlDosen = 6; //Anzahl Dosen Auf dem Spielfeld (am besten max 6.)
var lebenDosen = 1; //Insgesammte Versuche für den Dosenwerfstand
var aufgabenRichtigDosen = 0; // Anzahl richtig gelöster Aufgaben
var kleinstesErgebnissDosen = 1; //inbegriffen
var größtesErgebnissDosen = 76; //ausgeschlossen
var aufgabenZielDosen = 3;

function setUpDosenstand()
{

	$("body").css(
	{
		"backgroundImage" : "url('Dosenstand/Dosenstand.png')"
	});


	// Ab hier werden die Dosen initialisiert
	for(var i = 1; i<anzahlDosen+1; i++)
	{

		$("body").append("<div class='dose' id='"+ i +"'></div>");

		// Hier wird den Dosen unterschiedliche Bilder gegeben
		$((".dose#" + i)).css(
		{
			"backgroundImage" : "url('Dosenstand/JahrmarkDose_" + ((i%4)+1) + ".png')"
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
          dosenRichtig++;

					var dose = $(this);

					$("#"+(lebenDosen+1)+".ball").animate({
						top : [$(this).css("top"), "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 +"px"
					},1500,"swing", function(){
						$("body").append("<div class='schild s" +lebenDosen + "' id='richtig'></div>");
						$(".s"+lebenDosen).css({"top" : $(this).css("top"), "left" : $(this).css("left")});
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							$(this).hide();
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000);
						});
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt($(this).css("left")) - 100 + "px"

						}, 1000);
					});
				}
				else { // Dies ist der Fall der Falsch angeklickten Lösung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " - " +
					zahl2 + " = " + lösung);

					var dose = $(this);

					$("#"+(lebenDosen+1)+".ball").animate({
						top : [$(this).css("top"), "easeOutBack"],
						left : parseInt($(this).css("left")) + 35 +"px"
					},1500,"swing", function(){
						$("body").append("<div class='schild s" +lebenDosen + "' id='falsch'></div>");
						$(".s"+lebenDosen).css({"top" : $(this).css("top"), "left" : $(this).css("left")});
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							$(this).hide();
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000);
						});
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt($(this).css("left")) - 100 + "px"

						}, 1000);
					});
					//Hier Fehlt noch die Wurfanimation in der die Dose sammt
					//Flügel fällt


				}

				if(aufgabenRichtigDosen >= aufgabenZielDosen) // Hier wird nach dem Wurf geprüft ob man die benötigte anzahl an richtigen Würfen erreicht wurde
				{
					$(".aufgabe").text("Bravo! Du hast Gewonnen!");
					window.setTimeout(removeDosenwerfstand, 3000);
				}
				else if (lebenDosen < 1) { // Hier wird, falls der vorrige Fall NICHT eingetroffen ist geguckt ob alle Würfe verbraucht wurden
					$(".aufgabe").text("Du hast alle Bälle aufgebraucht! Insgesammt hast du "
					+ aufgabenRichtigDosen + " Aufgaben Richtig!");
					window.setTimeout(removeDosenwerfstand, 3000);
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
			"backgroundImage" : "url('Dosenstand/Jahrmarktball_" + ((i%3)+1) + ".png')",
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

function removeDosenwerfstand()
{
  dosenGespielt = true;

	$(".dose").remove();
	$(".ball").remove();
	$(".aufgabe").remove();
	$(".schild").remove();

	lebenDosen = 4;
	aufgabenRichtigDosen = 0;
	amWarten = false;

	setUpAuswahlscreen();
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
