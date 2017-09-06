var allducks = 6; // Die Anzahl aller Enten (Klickbarer Loesungsmoeglichkeiten)
var lebenDuck = 4; // Anzahl der Möglichkeiten Lösungen an zu klicken
var loesung1 = 0; // Speichert die Lösung der aktuellen aufgabe
var loesungsDuck = ""; // Speichert die Ente die die Lösung trägt
var loesungTemp = 0; // Zwischenspeicher zur berechnung der Aufgabe
var aufgabenRichtigEnten = 0; // Anzahl richtiger Aufgaben
var kleinstesErgebniss = 1; // Kleinstes moegliches Ergebniss
var groeßtesErgebniss = 500; // Größtes moegliches Ergebniss

function setUpEntenstand(){
	// Hier wird der HTML-Code für den Entenstand vorbereitet
	$("body").html(
		"<div class='clickDuck'>\
				<p class='zahl' id='zahl1'></p>\
				<img src='Entenstand/duck.png' class='duck'		alt='duck_left'  width='150' height='150' id='duck1'>\
			</div>	\
		\
			<div class='clickDuck'>\
				<p class='zahl' id='zahl2'></p>\
				<img src='Entenstand/duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck2'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl3'></p>\
				<img src='Entenstand/duck.png' class='duck' alt='duck_left'  width='150' height='150' id='duck3'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl4'></p>\
				<img src='Entenstand/duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck4'>\
			</div>\
		\
			<div class='clickDuck'>\
				<p class='zahl' id='zahl5'></p>\
				<img src='Entenstand/duck.png'	class='duck' alt='duck_left'  width='150' height='150' id='duck5'>\
			</div>\
		\
			<div class='clickDuck'>	\
				<p class='zahl' id='zahl6'></p>\
				<img src='Entenstand/duckinverted.png' class='duck' alt='duck_right' width='150' height='150' id='duck6'>\
			</div>\
		\
		<img src='Entenstand/duck.png'  class='ducklife' width='50' height='50' id='ducklife1'>\
		<img src='Entenstand/duck.png'  class='ducklife' width='50' height='50' id='ducklife2'>\
		<img src='Entenstand/duck.png'  class='ducklife' width='50' height='50' id='ducklife3'>\
		<img src='Entenstand/duck.png'  class='ducklife' width='50' height='50' id='ducklife4'>\
		\
			<div id='aufgabe'>\
				<p></p>\
			</div>\
			<div id='aufgabeFalsch'>\
				<p></p>\
			</div>");

	// Hier wird der Hintergrund festgelegt
	$("body").css({"background-image": "url('EntenStand/entenfischstand_only.png')"});

	generiereAufgabenDuck();
	$(".clickDuck").click(function()		// Damit man auf die enten Klicken kann mit feedback
	{
		if(!amWarten) // Hier werden Klicks während der Wartezeit abgefangen
		{
			amWarten = true;
			if(loesungTemp == parseInt($(this).children("p").text())) // Im Fall der richtigen Loesung
			{
				$("#ducklife"+lebenDuck).hide(); // Visueller Indikator, dass ein Leben verloren wurde
				aufgabenRichtigEnten++;
				lebenDuck--;

				$(this).children().hide(); // Die angeklickte Ente wird unsichtbar gesetzt
				$(this).find("img").attr("src","Entenstand/loesung_true.png");	//feedbeack
				$(this).find("img").show(); // feedback wird angezeigt
				$("#aufgabeFalsch").text("Das ist Richtig! "+ $(this).find("p").text()).css({"color":"green"});
				if(lebenDuck > 0) // Wenn der Spieler noch Leben übrig hat
				{
					// Die Nächste aufgabe wird generiert
					window.setTimeout(generiereAufgabenDuck, 1500);
					// Die Enten werden mit der neuen Aufgabe wieder angezeigt
					window.setTimeout(function(){$(this).find("img").attr("src","Entenstand/duck.png");
					$("p").show();},1500);
				}
			}
			else // Im Fall der falschen Loesung
			{
				$("#ducklife"+lebenDuck).hide(); // Die Ente verschwindet
				lebenDuck--;

				$(this).hide();
				$(this).find("img").attr("src","Entenstand/loesung_false.png"); //feedback
				$(this).show();

				$("#aufgabeFalsch").text("Das ist nicht Richtig! " + $(this).find("p").text()+ " Pass auf deine Leben auf -->").css({"color":"red"});
				amWarten = false;
			}
			if(lebenDuck < 1) // Wenn der Spieler keine Leben mehr hat
			{
				amWarten = true;
				window.setTimeout(removeEntenstand, 1500);
			}
		}
	});
}


function generiereAufgabenDuck()
{

	for(var i = 1; i<allducks+1; i++)
			{

				if(i % 2 == 0 ){
					if(!$("#duck"+i).attr("src","Entenstand/duckinverted.png")){ // ist ein feature!
					$("#duck"+i).attr("src","Entenstand/duckinverted.png");
					}
				}else{
					if(!$("#duck"+i).attr("src","Entenstand/duck.png")){
					$("#duck"+i).attr("src","Entenstand/duck.png");
					}
				}
			//verdoppeln
				do
				{
					var neueZahl = true;
					var temp = zufallsZahlen(kleinstesErgebniss, groeßtesErgebniss);

					if(temp % 2 != 0)// damit keine kommazahlehn entstehen !
					{
						temp++;
					}

					$("#zahl" + i).text(temp);	//Zahlen auffuellen
					for(var j = 1; j < i; j++)
					{
						if($("#zahl" + j).text() == $("#zahl" + i).text())
						{
							neueZahl = false;
						}
					}
				} while (!neueZahl);

				loesungsDuck = "#zahl" + parseInt(Math.random()*allducks+1);	//um die Loesung herauszufinden
				loesung1 = parseInt($(loesungsDuck).text());
				loesungTemp = loesung1;	//fuer die textbox mit der Loesung
				loesung1 /= 2;
				$("#aufgabe").text("Was ist das Doppelte der Zahl " + loesung1 + " ?");
			}
			amWarten = false;
}

function removeEntenstand()
{
	entenGespielt = true;

	entenRichtig = aufgabenRichtigEnten; // die Anzahl richtiger Antworten wird gespeichert

	// Hier werden alle Elemente nach ihrer Klasse entfernt
	$(".clickDuck").remove();
	$("#zahl").remove();
	$(".duck").remove();
	$(".ducklife").remove();
	$("#aufgabe").remove();
	$("#aufgabeFalsch").remove();

	amWarten = false;

	setUpAuswahlscreen();
}
