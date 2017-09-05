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

					//Anstatt dem Fadeout kommt hier die wurf animation
					//bei der die Flügel oben bleiben
					var dose = $(this);

					$("#"+(lebenDosen+1)+".ball").animate({
						top : [dose.css("top"), "easeOutBack"],
						left : parseInt(dose.css("left")) + 35 +"px"
					},1500,"swing", function(){
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							dose.hide();
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000);
						});
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt(dose.css("left")) - 100 + "px"

						}, 1000);
					});
				}
				else { // Dies ist der Fall der Falsch angeklickten Lösung
					$(".aufgabe").text("Das ist nicht Richtig! " + zahl1 + " - " +
					zahl2 + " = " + lösung);

					var dose = $(this);

					$("#"+(lebenDosen+1)+".ball").animate({
						top : [dose.css("top"), "easeOutBack"],
						left : parseInt(dose.css("left")) + 35 +"px"
					},1500,"swing", function(){
						dose.animate({
							top : "750px"
						},900, "easeInBack", function(){
							dose.hide();
							if(lebenDosen>0 && aufgabenRichtigDosen < aufgabenZielDosen)
								window.setTimeout(aufgabeErzeugenMinus, 1000);
						});
						$("#"+(lebenDosen+1)+".ball").animate({
							top: ["750px", "easeInBack"],
							left: parseInt(dose.css("left")) - 100 + "px"

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